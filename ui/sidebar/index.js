import "../shared.scss";
import "./sidebar.scss";
import { t, setLocale } from "../../src/i18n";
import { engines } from "../../src/engines";

const prefix = "animeenhancer:";
let state = { engine: "anime4k", mode: "off", quality: "fast", autoApply: true, lang: "auto" };
let hasState = false;
let readyTimer;
const escape = (value) => String(value || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

iina.onMessage(prefix + "state", (data) => {
  if (!data || !engines[data.engine]) return;
  state = data;
  setLocale(data.lang);
  hasState = true;
  clearInterval(readyTimer);
  render();
});

function render() {
  const app = document.getElementById("app");
  if (!app) return;
  const engine = engines[state.engine];
  app.innerHTML = `
    <div class="sidebar-container">
      <h2>AnimeEnhancer</h2>
      <p class="subtitle">${t("subtitle")}</p>
      <fieldset aria-busy="${hasState ? "false" : "true"}">
        <div class="section">
          <label class="section-title">${t("engine")}</label>
          <div class="button-group">${Object.values(engines).map((item) => `<button data-engine="${item.id}" class="${item.id === state.engine ? "active" : ""}" aria-pressed="${item.id === state.engine}">${item.name}</button>`).join("")}</div>
          <p class="engine-description">${engine.description()}</p>
        </div>
        <div class="section">
          <label class="section-title">${t("qualityTier")}</label>
          <div class="button-group">${engine.qualities.map((q) => `<button data-quality="${q}" class="${q === state.quality ? "active" : ""}" aria-pressed="${q === state.quality}">${engine.qualityName(q)}</button>`).join("")}</div>
        </div>
        <div class="section">
          <label class="section-title">${t("presets")}</label>
          <div class="modes-grid">${engine.modes().map((m) => `<button class="mode-card ${m.id === state.mode ? "active" : ""}" data-mode="${m.id}" aria-pressed="${m.id === state.mode}"><span class="mode-name">${m.name}</span><span class="mode-description">${m.desc}</span></button>`).join("")}</div>
        </div>
        <div class="section"><button class="off-button" data-mode="off">${t("disable")}</button></div>
        <div class="section options-section"><label class="toggle-label"><input type="checkbox" id="auto-apply-check" ${state.autoApply ? "checked" : ""}><span>${t("autoApply")}</span></label></div>
      </fieldset>
      <p role="alert" class="error-message">${escape(state.error)}</p>
    </div>`;
  const bind = (attr, message, key) => app.querySelectorAll(`[${attr}]`).forEach((el) => {
    el.addEventListener("click", () => iina.postMessage(prefix + message, { [key]: el.getAttribute(attr) }));
  });
  bind("data-engine", "setEngine", "engine");
  bind("data-quality", "setQuality", "quality");
  bind("data-mode", "applyMode", "mode");
  document.getElementById("auto-apply-check").addEventListener("change", (event) => {
    iina.postMessage(prefix + "setAutoApply", { autoApply: event.target.checked });
  });
}

function init() {
  render();
  iina.postMessage(prefix + "ready", {});
  let attempts = 0;
  readyTimer = setInterval(() => {
    if (hasState || ++attempts > 10) return clearInterval(readyTimer);
    iina.postMessage(prefix + "ready", {});
  }, 250);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
