<div align="center">

# 🌸 AnimeEnhancer for IINA

**IINA 動漫畫質增強外掛**

[![Release](https://img.shields.io/github/v/release/yorkyang2333/iina-AnimeEnhancer?style=for-the-badge&logo=github&color=FF69B4)](https://github.com/yorkyang2333/iina-AnimeEnhancer/releases)
[![Downloads](https://img.shields.io/github/downloads/yorkyang2333/iina-AnimeEnhancer/total?style=for-the-badge&logo=github&color=00d1b2)](https://github.com/yorkyang2333/iina-AnimeEnhancer/releases)
[![IINA](https://img.shields.io/badge/IINA-%E2%89%A5%201.3.0-5865F2?style=for-the-badge&logo=apple&logoColor=white)](https://iina.io/)
[![macOS](https://img.shields.io/badge/macOS-11.0%2B-000000?style=for-the-badge&logo=apple&logoColor=white)](https://www.apple.com/macos/)
[![Stars](https://img.shields.io/github/stars/yorkyang2333/iina-AnimeEnhancer?style=for-the-badge&logo=github&color=FFD700)](https://github.com/yorkyang2333/iina-AnimeEnhancer/stargazers)
[![Powered by Anime4K](https://img.shields.io/badge/Powered%20by-Anime4K-FF4500?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/bloc97/Anime4K)
[![Powered by AnimeJaNai](https://img.shields.io/badge/Powered%20by-AnimeJaNai-8A2BE2?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/the-database/mpv-AnimeJaNai)
[![Languages](https://img.shields.io/badge/Languages-54%20Locales-32CD32?style=for-the-badge&logo=googletranslate&logoColor=white)](https://github.com/yorkyang2333/iina-AnimeEnhancer/blob/main/src/i18n.js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://github.com/yorkyang2333/iina-AnimeEnhancer/blob/main/LICENSE)

[**English**](../README.md) • [**简体中文**](README_zh-Hans.md) • [**繁體中文**](README_zh-Hant.md) • [**日本語**](README_ja.md) • [**Русский**](README_ru.md)

</div>

---

**AnimeEnhancer for IINA** 是一款用於 [IINA](https://iina.io/) 的動漫畫質增強外掛。

## ✨ 功能亮點

* 🚀 **無縫貼合 IINA 原生體驗**：透過專屬 AnimeEnhancer 側邊欄、macOS 頂部選單列與 IINA 原生 OSD 提示完成全部控制，操作順暢不打斷觀影流程。
* 🧩 **雙增強引擎**：支援 Anime4K 與實驗性的 AnimeJaNai，各引擎分別儲存設定。AnimeJaNai 提供 **Quality / Balanced / Performance** 三檔 **2×** 超解析度設定。
* 🌐 **54 種語言支援**：對齊 IINA 官方支援的 54 個語系，提供智慧作業系統語系偵測。新增引擎說明已翻譯為英語、簡體中文、繁體中文、日語和俄語，其他語言使用英語。
* ⚖️ **雙通道畫質階梯 (Anime4K)**：
  * **Fast**：輕量高效，針對 Apple Silicon 標準晶片與 Intel 機型深度優化。
  * **HQ**：啟用進階多通道複合著色器，適合搭載強勁 GPU（如 M 系列 Pro / Max / Ultra 晶片）的設備。
* 🎛️ **六組核心預設鏈路 (Anime4K)**：支援 **Mode A、B、C、A+A、B+B、C+A** 六大模式，播放過程中隨時即時切換。
* 🔄 **智慧自動套用**：開啟後，載入新影片時會自動恢復您前次選定的畫質檔位與著色器模式。
* ⌨️ **極速快捷鍵**：支援選單快捷鍵（Anime4K：`1`–`6` 切換模式，`7` 切換 Fast 檔，`8` 切換 HQ 檔；AnimeJaNai：`1` / `2` / `3` 切換 Quality / Balanced / Performance；`0` 關閉增強）。

## 📖 預設模式指南

| 預設 | 建議起點與適用場景 |
| :---: | :--- |
| **Mode A** | 絕大多數 **1080p 動畫**，以及存在常規畫質模糊、輕微退化的片源 |
| **Mode B** | **720p 動畫**，或使用 Mode A 時畫面銳化痕跡過強、不夠自然的片源 |
| **Mode C** | **480p / SD 老番**、雜訊明顯，或需要先期降噪與重塑的內容 |
| **Mode A+A** | 雙通道進階 Mode A 鏈路；畫質極佳，運算消耗較大，銳化效果更加激進 |
| **Mode B+B** | 雙通道進階 Mode B 鏈路；畫質極佳，運算消耗較大，銳化效果更加激进 |
| **Mode C+A** | Mode C 降噪結合額外紋理重建；專門應對難度極高的低解析度老片源 |

> [!TIP]
> 絕大多數動畫推薦先從 **Fast + Mode A** 開始體驗。如果您的 Mac GPU 效能充裕，推薦嘗試 **HQ** 或雙通道複合模式（`A+A`、`B+B`、`C+A`）；如果發現畫面出現過度銳化、雜訊放大或振鈴白邊，請切換至較溫和的 Mode B 或 Mode C。

上表適用於 **Anime4K**。**AnimeJaNai** 透過 IINA 的 OpenGL 渲染器執行預先轉換的 V3.1 模型：HD Quality 和 Balanced 目前共用 V3.1 Balanced 模型，Performance 使用 V3.1 Performance。Windows 播放器的獨立 SD 鏈路及依解析度選擇模型的邏輯尚未移植。著色器與權重隨外掛封裝，正常建置和播放不轉換 ONNX，也不需要 Python 推論環境或 Windows 播放器；首次使用仍需由顯示卡驅動程式編譯 GLSL。此後端處於實驗階段，可能佔用大量顯示記憶體，不保證高畫質影片能即時播放。

## 🚀 安裝與使用

<div align="center">
  <img src="https://iina.io/img/blog/150-release/plugin-store.png" alt="IINA 外掛程式商店" width="600" />
</div>

### 方法一：透過 IINA 外掛程式商店一鍵安裝（推薦，IINA ≥ 1.5.0）

1. 打開 **IINA**，進入 **設定** (`⌘,`) → **外掛程式**。
2. 點擊 **Get Plugins…**（獲取外掛…）按鈕打開外掛程式商店面板。
3. 在頂部的 GitHub URL 輸入框中輸入 `yorkyang2333/iina-AnimeEnhancer`，點擊 **Install（安裝）**。

### 方法二：本機離線安裝

1. 前往 [**Releases**](https://github.com/yorkyang2333/iina-AnimeEnhancer/releases) 頁面下載最新版本的 `animeenhancer.iinaplgz` 外掛程式包。
2. 打開 IINA 進入 **設定** (`⌘,`) → **外掛程式**，點擊 **Install Local Package…**（安裝本地外掛…）按鈕，選擇下載的 `animeenhancer.iinaplgz` 檔案即可完成安裝。

---

### 快速上手

打開任意動畫影片，呼出 IINA 側邊欄，切換到 **AnimeEnhancer** 標籤頁，選擇引擎，再選擇您喜愛的畫質檔位與預設模式！首次使用預設關閉增強。外掛識別碼為 `com.yorkyang2333.AnimeEnhancer`，原儲存庫已重新命名為 iina-AnimeEnhancer。由於外掛識別碼變更，需要另外安裝，停用或解除安裝舊 Anime4K 外掛，並重新設定偏好。切換引擎會保留 `glsl-shaders` 中的其他著色器；請避免同時啟用會重寫整個著色器列表的其他外掛。

## 🛠️ 從原始碼建構

### 環境需求
* 已安裝 [IINA](https://iina.io/) 的 **macOS** 系統
* **Node.js** 與 **npm**
* **Python 3**
* **Git**（需支援 submodule 子模組，用於取得上游 Anime4K 與 AnimeJaNai 資源）

### 建構指令
```bash
git clone https://github.com/yorkyang2333/iina-AnimeEnhancer.git
cd iina-AnimeEnhancer
git submodule update --init --recursive
npm install
npm run pack
```
執行完畢後，專案根目錄下即可生成打包好的最新外掛程式包 `animeenhancer.iinaplgz`。

## 🤝 參與開發與貢獻 (Contributing)

我們非常歡迎社群開發者提交 Pull Request 與共建！在參與開發前，請務必閱讀我們的 [**開發者貢獻指南 (CONTRIBUTING.md)**](../CONTRIBUTING.md)，裡面詳細說明了本地開發環境配置、版本號遞增規範 (`ghVersion`) 以及 AnimeJaNai 模型轉換。

### 核心專案結構
* `src/index.js` — 外掛程式核心執行時（著色器自動配置、狀態持久化、選單同步、OSD 訊息與自動載入邏輯）。
* `src/engines.js` — 引擎登錄表、控制項、預設設定與著色器鏈路。
* `src/shader-controller.js` — 著色器歸屬管理，保留其他著色器。
* `src/shaders.js` — Fast 與 HQ 兩檔著色器鏈路與參數對映。
* `src/i18n.js` — 全量 54 種語言在地化字典與系統語系偵測引擎。
* `ui/sidebar/` — 側邊欄 Web UI 的前端互動與樣式定義。
* `build-shaders.py` — 將 Anime4K 著色器及預先轉換的 AnimeJaNai 著色器捆綁生成 `src/shaders-data.js`。
* `generate-pref.py` — 偏好設定頁面靜態多語言介面生成器（生成 `pref.html`）。

外掛原始碼採用 GPL-3.0，Anime4K 著色器採用 MIT 授權；AnimeJaNai 模型權重及轉換後的形式保留 CC BY-NC-SA 4.0 授權。署名與來源版本見 [THIRD_PARTY.md](../THIRD_PARTY.md)。

## 🤝 社群與友情連結

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
