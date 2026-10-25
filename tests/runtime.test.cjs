const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadRuntime(stored = {}, shaderList = ["/user/custom.glsl"], windowLoaded = true) {
  const prefs = { ...stored };
  const handlers = {};
  const events = {};
  const writes = new Map();
  const paths = ["Anime4K_Clamp_Highlights.glsl", "AnimeJaNai_Performance.glsl", "AnimeJaNai_Fast.glsl", "AnimeJaNai_Balanced.glsl", "AnimeJaNai_Sharp.glsl"];
  const shaderData = Object.fromEntries(paths.map((p) => [p, "shader"]));
  // Load production modules directly; the generated megabyte shader payload is
  // irrelevant to state transitions and mpv list ownership.
  const controllerSource = fs.readFileSync("src/shader-controller.js", "utf8").replace("export function", "function");
  const engineSource = fs.readFileSync("src/engines.js", "utf8").replace(/^import .*;\n/gm, "").replace(/export /g, "");
  const runtimeSource = fs.readFileSync("src/index.js", "utf8").replace(/^import .*;\n/gm, "");
  const calls = [];
  const sidebarLoads = [];
  let list = shaderList.slice();
  let reject = false;
  const item = (title, callback, options) => ({ title, callback, options, children: [], addSubMenuItem(child) { this.children.push(child); } });
  const context = vm.createContext({
    iina: {
      core: { window: { loaded: windowLoaded }, osd: (text) => calls.push(text) },
      event: { on: (name, fn) => events[name] = fn },
      menu: { item, separator: () => ({}), removeAllItems() {}, addItem() {}, forceUpdate() {} },
      mpv: { getNative: () => list.slice(), set: (key, value) => { if (!reject) list = Array.from(value); } },
      console: { log() {}, error() {} },
      file: { exists: (path) => writes.has(path), read: (path) => writes.get(path), write: (path, value) => writes.set(path, value) },
      utils: { resolvePath: (path) => path.replace("@data", "/plugin/data") },
      preferences: { get: (key) => prefs[key], set: (key, value) => prefs[key] = value, sync() {} },
      sidebar: {
        onMessage: (name, fn) => handlers[name] = fn,
        loadFile(path) {
          sidebarLoads.push(path);
          // JavascriptAPISidebarView.loadFile clears the native message hub.
          for (const name of Object.keys(handlers)) delete handlers[name];
        },
        postMessage: (name, state) => calls.push(JSON.parse(JSON.stringify(state))),
      },
    },
    shadersData: shaderData, shadersVersion: "test-version",
    presets: Object.fromEntries(["fast", "hq"].map((q) => [q, Object.fromEntries(["A", "B", "C", "A+A", "B+B", "C+A"].map((m) => [m, [paths[0]]]))])),
    getModes: () => ["A", "B", "C", "A+A", "B+B", "C+A"].map((id) => ({ id, name: id, desc: id })),
    t: (key) => key, setLocale() {}, setTimeout: (fn) => fn(),
  });
  vm.runInContext(controllerSource + "\n" + engineSource + "\n" + runtimeSource, context);
  return { prefs, events, writes, calls, sidebarLoads,
    send(name, value) { handlers["animeenhancer:" + name](value); },
    get list() { return list; }, set reject(value) { reject = value; },
  };
}

test("sidebar handshake and controls survive page loading for both window lifecycles", () => {
  for (const windowLoaded of [true, false]) {
    const r = loadRuntime({}, undefined, windowLoaded);
    assert.equal(r.sidebarLoads.length, windowLoaded ? 1 : 0);
    r.events["iina.window-loaded"]();
    assert.deepEqual(r.sidebarLoads, ["dist/ui/sidebar/sidebar.html"]);
    r.send("ready", {});
    assert.equal(r.calls.at(-1).engine, "anime4k");
    r.send("setEngine", { engine: "animejanai" });
    r.send("setQuality", { quality: "performance" });
    r.send("applyMode", { mode: "2x" });
    assert.equal(r.calls.at(-1).quality, "performance");
    assert.equal(r.calls.at(-1).mode, "2x");
    assert.equal(r.list.at(-1), "/plugin/data/AnimeJaNai_Performance.glsl");
    r.send("setAutoApply", { autoApply: false });
    assert.equal(r.calls.at(-1).autoApply, false);
    r.send("setLang", { lang: "zh-Hans" });
    assert.equal(r.calls.at(-1).lang, "zh-Hans");
    r.send("applyMode", { mode: "off" });
    assert.deepEqual(r.list, ["/user/custom.glsl"]);
  }
});

test("switch engines while active, restore separate presets, and preserve user shaders", () => {
  const r = loadRuntime();
  r.send("applyMode", { mode: "A" });
  assert.deepEqual(r.list, ["/user/custom.glsl", "/plugin/data/Anime4K_Clamp_Highlights.glsl"]);
  r.send("setQuality", { quality: "hq" });
  r.send("setEngine", { engine: "animejanai" });
  assert.deepEqual(r.list, ["/user/custom.glsl", "/plugin/data/AnimeJaNai_Balanced.glsl"]);
  assert.equal(r.prefs.mode, "2x");
  r.send("setEngine", { engine: "anime4k" });
  assert.equal(r.prefs.quality, "hq");
  assert.equal(r.prefs.mode, "A");
  r.send("applyMode", { mode: "off" });
  assert.deepEqual(r.list, ["/user/custom.glsl"]);
});

test("disabled engine changes remain disabled and malformed messages do not mutate playback", () => {
  const r = loadRuntime();
  r.send("setEngine", { engine: "animejanai" });
  assert.equal(r.prefs.mode, "off");
  r.send("applyMode", { mode: "A" });
  r.send("setQuality", { quality: "hq" });
  r.send("setAutoApply", { autoApply: "false" });
  assert.equal(r.prefs.mode, "off");
  assert.equal(r.prefs.autoApply, true);
  assert.deepEqual(r.list, ["/user/custom.glsl"]);
});

test("file load restores the selected engine and respects auto-apply", () => {
  const r = loadRuntime({ engine: "animejanai", engineSettings: { animejanai: { mode: "2x", quality: "performance" } } });
  r.events["iina.file-loaded"]();
  assert.equal(r.list.at(-1), "/plugin/data/AnimeJaNai_Performance.glsl");
  r.send("setAutoApply", { autoApply: false });
  r.events["iina.file-loaded"]();
  assert.deepEqual(r.list, ["/user/custom.glsl"]);
  assert.equal(r.prefs.mode, "off");
});

test("rejected mpv writes keep the last successful state", () => {
  const r = loadRuntime();
  r.send("applyMode", { mode: "A" });
  r.reject = true;
  r.send("setEngine", { engine: "animejanai" });
  assert.equal(r.prefs.engine, "anime4k");
  assert.equal(r.prefs.mode, "A");
  assert.equal(r.list.at(-1), "/plugin/data/Anime4K_Clamp_Highlights.glsl");
});

test("missing shader files are repaired even when the installation marker is current", () => {
  const r = loadRuntime();
  r.send("applyMode", { mode: "A" });
  r.writes.delete("/plugin/data/AnimeJaNai_Performance.glsl");
  r.send("setEngine", { engine: "animejanai" });
  assert.equal(r.writes.get("/plugin/data/AnimeJaNai_Performance.glsl"), "shader");
});

test("preferences synchronization reads language and auto-apply together", () => {
  const r = loadRuntime();
  r.prefs.lang = "zh-Hans";
  r.prefs.autoApply = false;
  r.events["iina.window-main.changed"](true);
  assert.equal(r.prefs.lang, "zh-Hans");
  assert.equal(r.prefs.autoApply, false);
});

test("all engine shader chains and preconverted model provenance are valid", () => {
  const crypto = require("node:crypto");
  const meta = JSON.parse(fs.readFileSync("AnimeJaNai/ports/mpv-glsl/models/animejanai/model.json", "utf8"));
  const sha = (path) => crypto.createHash("sha256").update(fs.readFileSync(path)).digest("hex");
  assert.equal(sha("AnimeJaNai/" + meta.path), meta.sha256);
  assert.equal(sha("AnimeJaNai/ports/mpv-glsl/" + meta.convertedShader), meta.convertedShaderSha256);
  for (const name of ["AnimeJaNai_Fast.glsl", "AnimeJaNai_Performance.glsl", "AnimeJaNai_Balanced.glsl", "AnimeJaNai_Sharp.glsl"]) {
    assert.ok(fs.existsSync("AnimeJaNai/ports/mpv-glsl/shaders/" + name), `Missing ${name}`);
  }
  const text = fs.readFileSync("src/shaders.js", "utf8");
  const files = new Set([...text.matchAll(/"(Anime4K_[^"]+\.glsl)"/g)].map((m) => m[1]));
  const { execFileSync } = require("node:child_process");
  const bundled = execFileSync("git", ["-C", "Anime4K", "ls-files", "glsl"], { encoding: "utf8" }).split("\n").map((name) => name.split("/").at(-1));
  for (const name of files) assert.ok(bundled.includes(name), `Missing ${name}`);
  const info = JSON.parse(fs.readFileSync("Info.json", "utf8"));
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  assert.equal(info.version, pkg.version);
  assert.equal(info.identifier, "com.yorkyang2333.AnimeEnhancer");
});


test("upgrade retains legacy Anime4K preferences without engine settings", () => {
  const r = loadRuntime({ quality: "hq", mode: "B+B", autoApply: true, lang: "zh-Hans" });
  r.send("ready", {});
  const state = r.calls.at(-1);
  assert.equal(state.engine, "anime4k");
  assert.equal(state.quality, "hq");
  assert.equal(state.mode, "B+B");
  assert.equal(state.autoApply, true);
  assert.equal(state.lang, "zh-Hans");
  r.send("setEngine", { engine: "animejanai" });
  r.send("setEngine", { engine: "anime4k" });
  assert.equal(r.prefs.quality, "hq");
  assert.equal(r.prefs.mode, "B+B");
});
