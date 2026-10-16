import { shadersData } from "./shaders-data";
import { presets } from "./shaders";
import { t, setLocale, getLocale, getModes } from "./i18n";

const { core, event, menu, mpv, console, file, utils, preferences, sidebar, overlay } = iina;

const sidebarMessages = {
  ready: "anime4k:ready",
  applyMode: "anime4k:applyMode",
  setQuality: "anime4k:setQuality",
  setAutoApply: "anime4k:setAutoApply",
  state: "anime4k:state"
};

const legacySidebarMessages = {
  ready: "ready",
  apply: "apply",
  toggleAutoApply: "toggleAutoApply",
  state: "state"
};

console.log("Anime4K Plugin is loading...");

// 1. Install shaders to @data/ directory on startup
function installShaders() {
  const testShader = "Anime4K_Clamp_Highlights.glsl";
  const testPath = utils.resolvePath(`@data/${testShader}`);
  
  if (!file.exists(testPath)) {
    console.log("Installing shaders to @data/...");
    for (const [name, content] of Object.entries(shadersData)) {
      const p = utils.resolvePath(`@data/${name}`);
      file.write(p, content);
    }
    console.log("Shaders installed successfully.");
  }
}

installShaders();

// 2. State Management
let currentQuality = preferences.get("quality") || "fast"; // "fast" or "hq"
let currentMode = preferences.get("mode") || "off"; // "A", "B", "off", etc
let autoApply = preferences.get("autoApply") !== false;
let currentLang = preferences.get("lang") || "auto";

setLocale(currentLang);

function saveState() {
  preferences.set("quality", currentQuality);
  preferences.set("mode", currentMode);
  preferences.set("autoApply", autoApply);
  preferences.set("lang", currentLang);
  preferences.sync();
}

function showOSD(text) {
  core.osd(text);
  
  // Also send to overlay if it's visible, or just rely on core OSD.
  // The plan called for an overlay, but IINA's core.osd is perfect for this.
  // Let's use core.osd for simplicity and native feel.
}

function sendSidebarState() {
  const state = {
    mode: currentMode,
    quality: currentQuality,
    autoApply: autoApply,
    lang: currentLang
  };

  console.log(`Anime4K sidebar: post state ${JSON.stringify(state)}`);
  sidebar.postMessage(sidebarMessages.state, state);
  sidebar.postMessage(legacySidebarMessages.state, state);
}

function applyShader(mode, quality = currentQuality) {
  try {
    console.log(`Anime4K sidebar: applyShader ${mode} / ${quality}`);

    if (mode === "off") {
      mpv.command("change-list", ["glsl-shaders", "clr", ""]);
      showOSD(t("osdOff"));
      currentMode = "off";
      saveState();
      rebuildMenus();
      sendSidebarState();
      return true;
    }

    const shaderList = presets[quality] && presets[quality][mode];
    if (!shaderList) {
      throw new Error(`Invalid mode/quality: ${mode} / ${quality}`);
    }

    const paths = shaderList.map(s => utils.resolvePath(`@data/${s}`)).join(":");
    mpv.command("change-list", ["glsl-shaders", "set", paths]);

    const qualityText = quality === "hq" ? t("hq") : t("fast");
    showOSD(t("osdMode", { mode: mode, quality: qualityText }));

    currentMode = mode;
    currentQuality = quality;
    saveState();
    rebuildMenus();
    sendSidebarState();
    return true;
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    console.error(`Anime4K: Failed to apply shader: ${message}`);
    showOSD(t("osdFailed"));
    sendSidebarState();
    return false;
  }
}

function setQuality(quality) {
  if (!presets[quality]) {
    console.error(`Anime4K: Invalid quality tier: ${quality}`);
    sendSidebarState();
    return;
  }

  if (currentMode !== "off") {
    applyShader(currentMode, quality);
    return;
  }

  currentQuality = quality;
  saveState();
  rebuildMenus();
  sendSidebarState();
}

function setAutoApply(value) {
  autoApply = value;
  saveState();
  rebuildMenus();
  sendSidebarState();
}

// 3. Menu System
let firstMenuBuild = true;

function setLang(lang) {
  if (currentLang === lang && getLocale() === lang) return;
  currentLang = lang;
  setLocale(lang);
  saveState();
  rebuildMenus();
  sendSidebarState();
}

function rebuildMenus() {
  if (!firstMenuBuild) {
    menu.removeAllItems();
  }

  const localizedModes = getModes();
  const bindings = ["1", "2", "3", "4", "5", "6"];

  // Presets submenu
  const presetSubMenu = menu.item(t("presetsMenu"));

  const offMenu = menu.item(t("disableMenu"), () => applyShader("off"), { keyBinding: "0" });
  offMenu.selected = (currentMode === "off");
  presetSubMenu.addSubMenuItem(offMenu);
  presetSubMenu.addSubMenuItem(menu.separator());

  localizedModes.forEach((m, i) => {
    const item = menu.item(`${m.name} (${m.desc})`, () => {
      applyShader(m.id, currentQuality);
    }, { keyBinding: bindings[i] });
    item.selected = (currentMode === m.id);
    presetSubMenu.addSubMenuItem(item);
  });

  // Quality submenu
  const qualityMenu = menu.item(t("qualityTier"));
  const fastQualityMenu = menu.item(t("fastMenu"), () => setQuality("fast"), { keyBinding: "7" });
  fastQualityMenu.selected = (currentQuality === "fast");
  const hqQualityMenu = menu.item(t("hqMenu"), () => setQuality("hq"), { keyBinding: "8" });
  hqQualityMenu.selected = (currentQuality === "hq");
  qualityMenu.addSubMenuItem(fastQualityMenu);
  qualityMenu.addSubMenuItem(hqQualityMenu);

  // Auto-apply toggle
  const autoApplyMenu = menu.item(t("autoApplyMenu"), () => setAutoApply(!autoApply));
  autoApplyMenu.selected = autoApply;

  menu.addItem(presetSubMenu);
  menu.addItem(qualityMenu);
  menu.addItem(autoApplyMenu);

  if (!firstMenuBuild) {
    menu.forceUpdate();
  }
  firstMenuBuild = false;
}

rebuildMenus();

// 4. Sidebar System
let sidebarLoaded = false;
let hasLoggedSidebarReady = false;

function logSidebarReady(protocol) {
  if (hasLoggedSidebarReady) return;
  hasLoggedSidebarReady = true;
  console.log(`Anime4K sidebar: received ${protocol} ready`);
}

function registerSidebarMessageHandlers() {
  sidebar.onMessage(sidebarMessages.ready, () => {
    logSidebarReady("modern");
    sendSidebarState();
  });

  sidebar.onMessage(sidebarMessages.applyMode, (data) => {
    console.log(`Anime4K sidebar: received applyMode ${data && data.mode}`);
    applyShader(data.mode, currentQuality);
  });

  sidebar.onMessage(sidebarMessages.setQuality, (data) => {
    console.log(`Anime4K sidebar: received setQuality ${data && data.quality}`);
    setQuality(data.quality);
  });

  sidebar.onMessage(sidebarMessages.setAutoApply, (data) => {
    console.log(`Anime4K sidebar: received setAutoApply ${data && data.autoApply}`);
    setAutoApply(data.autoApply);
  });

  sidebar.onMessage("anime4k:setLang", (data) => {
    console.log(`Anime4K sidebar: received setLang ${data && data.lang}`);
    if (data && data.lang) {
      setLang(data.lang);
    }
  });

  sidebar.onMessage("setLang", (data) => {
    console.log(`Anime4K sidebar: received legacy setLang ${data && data.lang}`);
    if (data && data.lang) {
      setLang(data.lang);
    }
  });

  sidebar.onMessage(legacySidebarMessages.ready, () => {
    logSidebarReady("legacy");
    sendSidebarState();
  });

  sidebar.onMessage(legacySidebarMessages.apply, (data) => {
    if (!data) return;
    console.log(`Anime4K sidebar: received legacy apply ${JSON.stringify(data)}`);

    if (data.mode === currentMode && data.quality && data.quality !== currentQuality) {
      setQuality(data.quality);
      return;
    }

    applyShader(data.mode, data.quality || currentQuality);
  });

  sidebar.onMessage(legacySidebarMessages.toggleAutoApply, (data) => {
    if (!data) return;
    console.log(`Anime4K sidebar: received legacy toggleAutoApply ${data.autoApply}`);
    setAutoApply(data.autoApply);
  });
}

function loadSidebar() {
  if (sidebarLoaded) return;
  sidebarLoaded = true;
  sidebar.loadFile("dist/ui/sidebar/sidebar.html");
  registerSidebarMessageHandlers();
}

if (core.window.loaded) {
  loadSidebar();
}

event.on("iina.window-loaded", loadSidebar);

// 5. Auto Apply
event.on("iina.file-loaded", () => {
  // Defer to the next event-loop turn so IINA's native player/window
  // lifecycle has fully settled before we touch menu proxies.
  setTimeout(() => {
    if (autoApply && currentMode !== "off") {
      // Re-apply the shader for the new file
      applyShader(currentMode, currentQuality);
    } else if (!autoApply && currentMode !== "off") {
      mpv.command("change-list", ["glsl-shaders", "clr", ""]);
      currentMode = "off";
      saveState();
      rebuildMenus();
      sendSidebarState();
    }
  }, 0);
});

// 6. Global preferences synchronization
if (iina.global && typeof iina.global.onMessage === "function") {
  iina.global.onMessage("anime4k:setLang", (data) => {
    console.log(`Anime4K global: received setLang ${data && data.lang}`);
    if (data && data.lang) {
      setLang(data.lang);
    }
  });
  iina.global.onMessage("setLang", (data) => {
    console.log(`Anime4K global: received legacy setLang ${data && data.lang}`);
    if (data && data.lang) {
      setLang(data.lang);
    }
  });
}

// Detect lang changes made in pref.html when window regains focus
event.on("iina.window-main.changed", (isMain) => {
  if (!isMain) return;
  const storedLang = preferences.get("lang") || "auto";
  if (storedLang !== currentLang) {
    console.log(`Anime4K: preference lang changed from ${currentLang} to ${storedLang}`);
    setLang(storedLang);
  }
});

console.log("Anime4K Plugin initialized.");
