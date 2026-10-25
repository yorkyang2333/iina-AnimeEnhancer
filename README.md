<div align="center">

# 🌸 AnimeEnhancer for IINA

**Anime Enhancement Plugin for IINA**

[![Release](https://img.shields.io/github/v/release/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FF69B4)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![Downloads](https://img.shields.io/github/downloads/yorkyang2333/iina-anime4k/total?style=for-the-badge&logo=github&color=00d1b2)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![IINA](https://img.shields.io/badge/IINA-%E2%89%A5%201.3.0-5865F2?style=for-the-badge&logo=apple&logoColor=white)](https://iina.io/)
[![macOS](https://img.shields.io/badge/macOS-11.0%2B-000000?style=for-the-badge&logo=apple&logoColor=white)](https://www.apple.com/macos/)
[![Stars](https://img.shields.io/github/stars/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FFD700)](https://github.com/yorkyang2333/iina-anime4k/stargazers)
[![Powered by Anime4K](https://img.shields.io/badge/Powered%20by-Anime4K-FF4500?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/bloc97/Anime4K)
[![Powered by AnimeJaNai](https://img.shields.io/badge/Powered%20by-AnimeJaNai-8A2BE2?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/the-database/mpv-AnimeJaNai)
[![Languages](https://img.shields.io/badge/Languages-54%20Locales-32CD32?style=for-the-badge&logo=googletranslate&logoColor=white)](https://github.com/yorkyang2333/iina-anime4k/blob/main/src/i18n.js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://github.com/yorkyang2333/iina-anime4k/blob/main/LICENSE)

[**English**](README.md) • [**简体中文**](docs/README_zh-Hans.md) • [**繁體中文**](docs/README_zh-Hant.md) • [**日本語**](docs/README_ja.md) • [**Русский**](docs/README_ru.md)

</div>

---

**AnimeEnhancer for IINA** is an anime enhancement plugin for [IINA](https://iina.io/).

## ✨ Features

* 🚀 **Native IINA Workflow**: Control everything via the dedicated AnimeEnhancer sidebar tab, macOS top menu bar, and native IINA OSD feedback without leaving playback.
* 🧩 **Two Enhancement Engines**: Switch between Anime4K and experimental AnimeJaNai, with separate saved settings for each engine. AnimeJaNai provides **Quality / Balanced / Performance** profiles with **2×** upscaling.
* 🌐 **Global 54-Language Support**: Aligned with official IINA's internationalization roster, with dynamic system locale detection. New engine descriptions are translated into English, Simplified Chinese, Traditional Chinese, Japanese and Russian, with English fallback for other locales.
* ⚖️ **Two Quality Tiers (Anime4K)**:
  * **Fast**: Lightweight & efficient, optimized for standard Apple Silicon chips and Intel Macs.
  * **HQ**: Advanced multi-pass shader variants for high-end GPUs (M-series Pro/Max/Ultra chips).
* 🎛️ **Six Preset Chains (Anime4K)**: Switch between **Mode A, B, C, A+A, B+B, and C+A** instantly during video playback.
* 🔄 **Smart Auto-Apply**: Automatically restores your preferred scaling mode and quality tier whenever a new video loads.
* ⌨️ **Menu Keybindings**: Quick keyboard shortcuts (`1`–`6` for Anime4K presets, `7` for Fast, `8` for HQ; `1` / `2` / `3` for AnimeJaNai Quality / Balanced / Performance; `0` to disable).

## 📖 Preset Guide

| Preset | Best Starting Point & Recommended Usage |
| :---: | :--- |
| **Mode A** | Most **1080p anime** and generally degraded or blurry sources |
| **Mode B** | **720p anime** or sources where Mode A appears too sharp or unnatural |
| **Mode C** | **480p / SD anime**, noisy sources, or videos requiring denoise-first processing |
| **Mode A+A** | Double-pass Mode A chain; higher quality, slower, and more aggressive sharpening |
| **Mode B+B** | Double-pass Mode B chain; higher quality, slower, and more aggressive sharpening |
| **Mode C+A** | Mode C combined with extra reconstruction; ideal for difficult low-resolution video |

> [!TIP]
> Start with **Fast + Mode A** for most anime videos. If your Mac has extra GPU headroom, switch to **HQ** or one of the double-pass modes (`A+A`, `B+B`, `C+A`). If the image appears over-sharpened, noisy, or introduces ringing artifacts, step back to Mode B or Mode C.

The table above describes **Anime4K**. **AnimeJaNai** runs preconverted V3.1 models through IINA's OpenGL renderer: HD Quality and Balanced currently share the V3.1 Balanced model, while Performance uses V3.1 Performance. The separate SD chain and resolution-aware model selection from the Windows player are not yet ported. Shaders and weights are bundled; normal builds and playback do not convert ONNX or require a Python inference environment or the Windows player. The GPU driver compiles GLSL on first use. This backend is experimental, can use substantial GPU memory and does not guarantee real-time HD playback.

## 🚀 Installation

<div align="center">
  <img src="https://iina.io/img/blog/150-release/plugin-store.png" alt="IINA Plugin Store" width="600" />
</div>

### Method 1: Install via IINA Plugin Store (Recommended, IINA ≥ 1.5.0)

1. Open **IINA** and navigate to **Settings** (`⌘,`) → **Plugins**.
2. Click **Get Plugins…** to open the Plugin Store.
3. Enter `yorkyang2333/iina-anime4k` in the GitHub URL field and click **Install**.

### Method 2: Manual / Offline Installation

1. Download the latest `animeenhancer.iinaplgz` package from [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases).
2. Open IINA, go to **Settings** (`⌘,`) → **Plugins**, click **Install Local Package…**, and select the downloaded `animeenhancer.iinaplgz` file.

---

### Quick Start

Open any anime video in IINA, show the sidebar, switch to the **AnimeEnhancer** tab, choose an engine, and select your preferred quality tier and preset mode! Enhancement starts disabled. The identifier is `com.yorkyang2333.anime4k`; it continues the original Anime4K plugin in the same repository and retains its saved preferences. Switching engines preserves other shaders in `glsl-shaders`; avoid simultaneously enabling another plugin that rewrites the entire list.

## 🛠️ Build From Source

### Requirements
* **macOS** with [IINA](https://iina.io/) installed
* **Node.js** & **npm**
* **Python 3**
* **Git** (with submodule support for upstream Anime4K and AnimeJaNai resources)

### Build Commands
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
Once the build finishes, the packaged plugin `animeenhancer.iinaplgz` will be generated in the project root directory.

## 🤝 Contributing & Development

We welcome pull requests and contributions from the community! Please read our [**Contributing Guide (CONTRIBUTING.md)**](CONTRIBUTING.md) for detailed guidelines on local development setup, versioning conventions (`ghVersion`), and AnimeJaNai model conversion.

### Core Architecture
* `src/index.js` — The core plugin runtime (shader installation, state persistence, menu synchronization, OSD messaging, and auto-apply logic).
* `src/engines.js` — Engine registry, controls, defaults and shader chains.
* `src/shader-controller.js` — Shader ownership management that preserves unrelated shaders.
* `src/shaders.js` — Configuration and mapping for Fast and HQ shader chains.
* `src/i18n.js` — Full 54-language native localization dictionary and system locale detection engine.
* `ui/sidebar/` — Web UI components and styling for the IINA sidebar.
* `build-shaders.py` — Bundles Anime4K shaders and preconverted AnimeJaNai shaders into `src/shaders-data.js`.
* `generate-pref.py` — Generates the static multilingual preferences interface (`pref.html`).

The plugin source is GPL-3.0. Anime4K shaders are MIT-licensed; AnimeJaNai model weights and their converted form retain CC BY-NC-SA 4.0. See [THIRD_PARTY.md](THIRD_PARTY.md) for attribution and source revisions.

## 🤝 Community & Links

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
