import { presets } from "./shaders";
import { getModes, t } from "./i18n";

// Each engine supplies its own controls and shader chains. UI and playback code
// consume this registry without assigning Anime4K-specific meanings to new engines.
export const engines = {
  anime4k: {
    id: "anime4k",
    name: "Anime4K",
    qualities: ["fast", "hq"],
    defaultQuality: "fast",
    defaultMode: "A",
    presets,
    modes: () => getModes(),
    qualityName: (quality) => t(quality === "hq" ? "hq" : "fast"),
    description: () => t("anime4kDescription"),
  },
  animejanai: {
    id: "animejanai",
    name: "AnimeJaNai",
    qualities: ["quality", "balanced", "performance"],
    defaultQuality: "balanced",
    defaultMode: "2x",
    presets: {
      quality: { "2x": ["AnimeJaNai_Balanced.glsl"] },
      balanced: { "2x": ["AnimeJaNai_Balanced.glsl"] },
      performance: { "2x": ["AnimeJaNai_Performance.glsl"] },
    },
    modes: () => [{ id: "2x", name: "AnimeJaNai HD · 2×", desc: t("animejanaiDescription") }],
    qualityName: (quality) => t(`animejanai${quality[0].toUpperCase()}${quality.slice(1)}`),
    description: () => t("animejanaiDescription"),
  },
};

export function engineState(id, stored = {}) {
  const engine = engines[id] || engines.anime4k;
  const quality = engine.qualities.includes(stored.quality) ? stored.quality : engine.defaultQuality;
  const mode = stored.mode === "off" || engine.presets[quality][stored.mode] ? stored.mode : "off";
  return { quality, mode };
}
