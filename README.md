⚠️ **Deprecation notice:** Anime4K for IINA will soon be deprecated. Please migrate to [AnimeEnhancer for IINA](https://github.com/yorkyang2333/iina-AnimeEnhancer), which includes Anime4K and the experimental AnimeJaNai engine. Install the [latest release](https://github.com/yorkyang2333/iina-AnimeEnhancer/releases/latest), then disable or uninstall this old plugin before enabling AnimeEnhancer to avoid conflicting shader control. AnimeEnhancer uses a separate plugin identifier; install it separately and configure your preferences again.

<div align="center">

# 🌸 Anime4K for IINA

**High-Quality Real-Time Anime Upscaling Plugin for macOS IINA**

[![Release](https://img.shields.io/github/v/release/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FF69B4)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![Downloads](https://img.shields.io/github/downloads/yorkyang2333/iina-anime4k/total?style=for-the-badge&logo=github&color=00d1b2)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![IINA](https://img.shields.io/badge/IINA-%E2%89%A5%201.3.0-5865F2?style=for-the-badge&logo=apple&logoColor=white)](https://iina.io/)
[![macOS](https://img.shields.io/badge/macOS-11.0%2B-000000?style=for-the-badge&logo=apple&logoColor=white)](https://www.apple.com/macos/)
[![Stars](https://img.shields.io/github/stars/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FFD700)](https://github.com/yorkyang2333/iina-anime4k/stargazers)
[![Powered by Anime4K](https://img.shields.io/badge/Powered%20by-Anime4K-FF4500?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/bloc97/Anime4K)
[![Languages](https://img.shields.io/badge/Languages-54%20Locales-32CD32?style=for-the-badge&logo=googletranslate&logoColor=white)](https://github.com/yorkyang2333/iina-anime4k/blob/main/src/i18n.js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://github.com/yorkyang2333/iina-anime4k/blob/main/LICENSE)

[**English**](README.md) • [**简体中文**](docs/README_zh-Hans.md) • [**繁體中文**](docs/README_zh-Hant.md) • [**日本語**](docs/README_ja.md) • [**Русский**](docs/README_ru.md)

</div>

---

**Anime4K for IINA** is a modern macOS plugin that packages the acclaimed [Anime4K](https://github.com/bloc97/Anime4K) real-time GLSL shaders and embeds them seamlessly into [IINA](https://iina.io/). It installs the bundled shaders into the plugin data directory on first launch, dynamically managing mpv's `glsl-shaders` list on the fly—no manual `mpv.conf` configuration or script editing required!

## ✨ Features

* 🚀 **Native IINA Workflow**: Control everything via the dedicated Anime4K sidebar tab, macOS top menu bar, and native IINA OSD feedback without leaving playback.
* 🌐 **Global 54-Language Support**: Fully aligned with official IINA's internationalization roster, featuring native UI translations and dynamic system locale detection.
* ⚖️ **Two Quality Tiers**:
  * **Fast**: Lightweight & efficient, optimized for standard Apple Silicon chips and Intel Macs.
  * **HQ**: Advanced multi-pass shader variants for high-end GPUs (M-series Pro/Max/Ultra chips).
* 🎛️ **Six Preset Chains**: Switch between **Mode A, B, C, A+A, B+B, and C+A** instantly during video playback.
* 🔄 **Smart Auto-Apply**: Automatically restores your preferred scaling mode and quality tier whenever a new video loads.
* ⌨️ **Menu Keybindings**: Quick keyboard shortcuts (`1`–`6` for presets, `0` to disable, `7` for Fast tier, and `8` for HQ tier).

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

## 🚀 Installation

<div align="center">
  <img src="https://iina.io/img/blog/150-release/plugin-store.png" alt="IINA Plugin Store" width="600" />
</div>

### Method 1: Install via IINA Plugin Store (Recommended, IINA ≥ 1.5.0)

1. Open **IINA** and navigate to **Settings** (`⌘,`) → **Plugins**.
2. Click **Get Plugins…** to open the Plugin Store.
3. Under **Community Plugins**, find **Anime4K** and click **Install**.
   *(Alternatively, enter `yorkyang2333/iina-anime4k` in the GitHub URL field and click **Install**).*

### Method 2: Manual / Offline Installation

1. Download the latest `anime4k.iinaplgz` package from [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases).
2. Open IINA, go to **Settings** (`⌘,`) → **Plugins**, click **Install Local Package…**, and select the downloaded `anime4k.iinaplgz` file.

---

### Quick Start

Open any anime video in IINA, show the sidebar, switch to the **Anime4K** tab, and select your preferred quality tier and preset mode!

## 🛠️ Build From Source

### Requirements
* **macOS** with [IINA](https://iina.io/) installed
* **Node.js** & **npm**
* **Python 3**
* **Git** (with submodule support for upstream Anime4K shaders)

### Build Commands
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
Once the build finishes, the packaged plugin `anime4k.iinaplgz` will be generated in the project root directory.

## 🤝 Contributing & Development

We welcome pull requests and contributions from the community! Please read our [**Contributing Guide (CONTRIBUTING.md)**](CONTRIBUTING.md) for detailed guidelines on local development setup, versioning conventions (`ghVersion`), and IINA's automated release architecture.

### Core Architecture
* `src/index.js` — The core plugin runtime (shader installation, state persistence, menu synchronization, OSD messaging, and auto-apply logic).
* `src/shaders.js` — Configuration and mapping for Fast and HQ shader chains.
* `src/i18n.js` — Full 54-language native localization dictionary and system locale detection engine.
* `ui/sidebar/` — Web UI components and styling for the IINA sidebar.
* `build-shaders.py` — Pre-compilation script that processes `Anime4K/glsl/**/*.glsl` and generates `src/shaders-data.js`.
* `generate-pref.py` — Generates the static multilingual preferences interface (`pref.html`).

## 🤝 Community & Links

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
