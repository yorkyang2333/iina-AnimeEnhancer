import { shadersData, shadersVersion } from "./shaders-data";
import { engines, engineState } from "./engines";
import { createShaderController } from "./shader-controller";
import { t, setLocale } from "./i18n";

const { core, event, menu, mpv, console, file, utils, preferences, sidebar } = iina;
const prefix = "animeenhancer:";
const resolvePath = (path) => utils.resolvePath(path);
const shaders = createShaderController(mpv, resolvePath, Object.keys(shadersData));
let currentEngine = engines[preferences.get("engine")] ? preferences.get("engine") : "anime4k";
let savedEngines = preferences.get("engineSettings") || {};
if (typeof savedEngines !== "object" || Array.isArray(savedEngines)) savedEngines = {};
let selection = engineState(currentEngine, savedEngines[currentEngine] || {
  quality: preferences.get("quality"), mode: preferences.get("mode"),
});
let autoApply = preferences.get("autoApply") !== false;
let currentLang = preferences.get("lang") || "auto";
let errorMessage = "";
let firstMenuBuild = true;
let sidebarLoaded = false;
setLocale(currentLang);

function installShaders() {
  const marker = resolvePath("@data/shaders-version");
  const complete = file.exists(marker) && file.read(marker, {}) === shadersVersion &&
    Object.keys(shadersData).every((name) => file.exists(resolvePath(`@data/${name}`)));
  if (complete) return;
  for (const [name, content] of Object.entries(shadersData)) file.write(resolvePath(`@data/${name}`), content);
  file.write(marker, shadersVersion);
}

function saveState() {
  savedEngines[currentEngine] = { ...selection };
  preferences.set("engine", currentEngine);
  preferences.set("engineSettings", savedEngines);
  preferences.set("quality", selection.quality);
  preferences.set("mode", selection.mode);
  preferences.set("autoApply", autoApply);
  preferences.set("lang", currentLang);
  preferences.sync();
}

function sendSidebarState() {
  sidebar.postMessage(prefix + "state", {
    engine: currentEngine, ...selection, autoApply, lang: currentLang, error: errorMessage,
  });
}

function refresh() {
  rebuildMenus();
  sendSidebarState();
}

function applySelection(id, mode, quality, announce = true) {
  try {
    const engine = engines[id];
    if (!engine || !engine.qualities.includes(quality) || (mode !== "off" && !engine.presets[quality][mode])) {
      throw new Error("Invalid enhancement engine or preset");
    }
    installShaders();
    shaders.apply(mode === "off" ? [] : engine.presets[quality][mode]);
    savedEngines[currentEngine] = { ...selection };
    currentEngine = id;
    selection = { mode, quality };
    errorMessage = "";
    saveState();
    if (announce) core.osd(mode === "off" ? t("osdOff") : `${engine.name}: ${mode} (${engine.qualityName(quality)})`);
    refresh();
    return true;
  } catch (error) {
    errorMessage = error.message || String(error);
    console.error(`AnimeEnhancer: ${errorMessage}`);
    core.osd(t("osdFailed"));
    sendSidebarState();
    return false;
  }
}

function setEngine(id) {
  if (!engines[id] || id === currentEngine) return;
  const next = engineState(id, savedEngines[id]);
  // Switching engines preserves the off state. Active playback selects the
  // remembered preset for the new engine, or its default on first use.
  const mode = selection.mode === "off" ? "off" : next.mode === "off" ? engines[id].defaultMode : next.mode;
  applySelection(id, mode, next.quality);
}

function setQuality(quality) {
  applySelection(currentEngine, selection.mode, quality);
}

function setAutoApply(value) {
  if (typeof value !== "boolean") return;
  autoApply = value;
  saveState();
  refresh();
}

function setLang(lang) {
  if (typeof lang !== "string") return;
  currentLang = lang;
  setLocale(lang);
  saveState();
  refresh();
}

function rebuildMenus() {
  if (!firstMenuBuild) menu.removeAllItems();
  const engineMenu = menu.item(t("engine"));
  Object.values(engines).forEach((engine) => {
    const item = menu.item(engine.name, () => setEngine(engine.id));
    item.selected = engine.id === currentEngine;
    engineMenu.addSubMenuItem(item);
  });
  const engine = engines[currentEngine];
  const presetMenu = menu.item(t("presetsMenu"));
  const off = menu.item(t("disableMenu"), () => applySelection(currentEngine, "off", selection.quality), { keyBinding: "0" });
  off.selected = selection.mode === "off";
  presetMenu.addSubMenuItem(off);
  presetMenu.addSubMenuItem(menu.separator());
  engine.modes().forEach((mode, index) => {
    const options = engine.id === "anime4k" ? { keyBinding: String(index + 1) } : {};
    const title = engine.id === "anime4k" ? `${mode.name} (${mode.desc})` : mode.name;
    const item = menu.item(title, () => applySelection(currentEngine, mode.id, selection.quality), options);
    item.selected = selection.mode === mode.id;
    presetMenu.addSubMenuItem(item);
  });
  const qualityMenu = menu.item(t("qualityTier"));
  engine.qualities.forEach((quality, index) => {
    const keyBinding = engine.id === "animejanai" ? String(index + 1) : String(index + 7);
    const item = menu.item(engine.qualityName(quality), () => setQuality(quality), { keyBinding });
    item.selected = selection.quality === quality;
    qualityMenu.addSubMenuItem(item);
  });
  const autoMenu = menu.item(t("autoApplyMenu"), () => setAutoApply(!autoApply));
  autoMenu.selected = autoApply;
  menu.addItem(engineMenu);
  menu.addItem(presetMenu);
  menu.addItem(qualityMenu);
  menu.addItem(autoMenu);
  if (!firstMenuBuild) menu.forceUpdate();
  firstMenuBuild = false;
}

function loadSidebar() {
  if (sidebarLoaded) return;
  sidebarLoaded = true;
  // IINA clears sidebar message listeners when loading a page.
  sidebar.loadFile("dist/ui/sidebar/sidebar.html");
  sidebar.onMessage(prefix + "ready", sendSidebarState);
  sidebar.onMessage(prefix + "setEngine", (data) => data && setEngine(data.engine));
  sidebar.onMessage(prefix + "applyMode", (data) => data && applySelection(currentEngine, data.mode, selection.quality));
  sidebar.onMessage(prefix + "setQuality", (data) => data && setQuality(data.quality));
  sidebar.onMessage(prefix + "setAutoApply", (data) => data && setAutoApply(data.autoApply));
  sidebar.onMessage(prefix + "setLang", (data) => data && setLang(data.lang));
}

rebuildMenus();
if (core.window.loaded) loadSidebar();
event.on("iina.window-loaded", loadSidebar);
event.on("iina.file-loaded", () => {
  setTimeout(() => {
    if (autoApply && selection.mode !== "off") applySelection(currentEngine, selection.mode, selection.quality, false);
    else if (!autoApply) applySelection(currentEngine, "off", selection.quality, false);
  }, 0);
});
event.on("iina.window-main.changed", (isMain) => {
  if (!isMain) return;
  const storedLang = preferences.get("lang") || "auto";
  const storedAutoApply = preferences.get("autoApply") !== false;
  if (storedLang !== currentLang || storedAutoApply !== autoApply) {
    currentLang = storedLang;
    autoApply = storedAutoApply;
    setLocale(currentLang);
    saveState();
    refresh();
  }
});
console.log("AnimeEnhancer initialized.");
