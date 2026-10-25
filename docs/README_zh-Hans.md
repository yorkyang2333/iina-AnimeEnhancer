<div align="center">

# 🌸 AnimeEnhancer for IINA

**IINA 动漫画质增强插件**

[![Release](https://img.shields.io/github/v/release/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FF69B4)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![Downloads](https://img.shields.io/github/downloads/yorkyang2333/iina-anime4k/total?style=for-the-badge&logo=github&color=00d1b2)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![IINA](https://img.shields.io/badge/IINA-%E2%89%A5%201.3.0-5865F2?style=for-the-badge&logo=apple&logoColor=white)](https://iina.io/)
[![macOS](https://img.shields.io/badge/macOS-11.0%2B-000000?style=for-the-badge&logo=apple&logoColor=white)](https://www.apple.com/macos/)
[![Stars](https://img.shields.io/github/stars/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FFD700)](https://github.com/yorkyang2333/iina-anime4k/stargazers)
[![Powered by Anime4K](https://img.shields.io/badge/Powered%20by-Anime4K-FF4500?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/bloc97/Anime4K)
[![Powered by AnimeJaNai](https://img.shields.io/badge/Powered%20by-AnimeJaNai-8A2BE2?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/the-database/mpv-AnimeJaNai)
[![Languages](https://img.shields.io/badge/Languages-54%20Locales-32CD32?style=for-the-badge&logo=googletranslate&logoColor=white)](https://github.com/yorkyang2333/iina-anime4k/blob/main/src/i18n.js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://github.com/yorkyang2333/iina-anime4k/blob/main/LICENSE)

[**English**](../README.md) • [**简体中文**](README_zh-Hans.md) • [**繁體中文**](README_zh-Hant.md) • [**日本語**](README_ja.md) • [**Русский**](README_ru.md)

</div>

---

**AnimeEnhancer for IINA** 是一款用于 [IINA](https://iina.io/) 的动漫画质增强插件。

## ✨ 功能亮点

* 🚀 **无缝贴合 IINA 原生体验**：通过专属 AnimeEnhancer 侧边栏、macOS 顶部菜单栏和 IINA 原生 OSD 提示完成全部控制，操作顺滑不打断观影流程。
* 🧩 **双增强引擎**：支持 Anime4K 与实验性的 AnimeJaNai，各引擎分别保存设置。AnimeJaNai 提供 **Quality / Balanced / Performance** 三档 **2×** 超分辨率配置。
* 🌐 **54 种语言支持**：对齐 IINA 官方支持的 54 个语种，提供智能操作系统语种检测。新增引擎说明已翻译为英语、简体中文、繁体中文、日语和俄语，其他语言回退到英语。
* ⚖️ **双通道画质阶梯 (Anime4K)**：
  * **Fast**：轻量高效，针对 Apple Silicon 标准芯片与 Intel 机型深度优化。
  * **HQ**：启用高阶多通道复合着色器，适合搭载强劲 GPU（如 M 系列 Pro / Max / Ultra 芯片）的设备。
* 🎛️ **六组核心预设链路 (Anime4K)**：支持 **Mode A、B、C、A+A、B+B、C+A** 六大模式，播放过程中任意实时切换。
* 🔄 **智能自动应用**：开启后，载入新视频时会自动恢复您上一次选定的画质档位与着色器模式。
* ⌨️ **极速快捷键**：支持菜单快捷键（Anime4K：`1`–`6` 切换模式，`7` 切换 Fast 档，`8` 切换 HQ 档；AnimeJaNai：`1` / `2` / `3` 切换 Quality / Balanced / Performance；`0` 关闭增强）。

## 📖 预设模式指南

| 预设 | 建议起点与适用场景 |
| :---: | :--- |
| **Mode A** | 绝大多数 **1080p 动画**，以及存在常规画质模糊、轻微退化的片源 |
| **Mode B** | **720p 动画**，或使用 Mode A 时画面锐化痕迹过强、不够自然的片源 |
| **Mode C** | **480p / SD 老番**、噪点明显，或需要先期降噪与重塑的内容 |
| **Mode A+A** | 双通道高阶 Mode A 链路；画质极佳，运算消耗较大，锐化效果更加激进 |
| **Mode B+B** | 双通道高阶 Mode B 链路；画质极佳，运算消耗较大，锐化效果更加激进 |
| **Mode C+A** | Mode C 降噪结合额外纹理重建；专门应对难度极高的低分辨率老片源 |

> [!TIP]
> 绝大多数动画推荐先从 **Fast + Mode A** 开始体验。如果您的 Mac GPU 性能充裕，推荐尝试 **HQ** 或双通道复合模式（`A+A`、`B+B`、`C+A`）；如果发现画面出现过度锐化、噪点放大或振铃白边，请切换至较温和的 Mode B 或 Mode C。

上表适用于 **Anime4K**。**AnimeJaNai** 通过 IINA 的 OpenGL 渲染器运行预先转换的 V3.1 模型：HD Quality 和 Balanced 当前共用 V3.1 Balanced 模型，Performance 使用 V3.1 Performance。Windows 播放器的独立 SD 链路及按分辨率选择模型的逻辑尚未移植。着色器与权重随插件打包，正常构建与播放不转换 ONNX，也不需要 Python 推理环境或 Windows 播放器；首次使用仍需由显卡驱动编译 GLSL。该后端处于实验阶段，可能占用大量显存，不保证高清实时播放。

## 🚀 安装与使用

<div align="center">
  <img src="https://iina.io/img/blog/150-release/plugin-store.png" alt="IINA 插件商店" width="600" />
</div>

### 方法一：通过 IINA 插件商店一键安装（推荐，IINA ≥ 1.5.0）

1. 打开 **IINA**，进入 **设置** (`⌘,`) → **插件**。
2. 点击 **获取插件…**（Get Plugins…）按钮打开插件商店面板。
3. 在顶部的 GitHub URL 输入框中输入 `yorkyang2333/iina-anime4k`，点击 **Install（安装）**。

### 方法二：本地离线安装

1. 前往 [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases) 页面下载最新版本的 `animeenhancer.iinaplgz` 插件包。
2. 打开 IINA 进入 **设置** (`⌘,`) → **插件**，点击 **安装本地插件…**（Install Local Package…）按钮，选择下载的 `animeenhancer.iinaplgz` 文件即可完成安装。

---

### 快速上手

打开任意动画视频，呼出 IINA 侧边栏，切换到 **AnimeEnhancer** 标签页，选择引擎，再选择您喜爱的画质档位与预设模式！首次使用默认关闭增强。插件标识为 `com.yorkyang2333.anime4k`，沿用原 Anime4K 插件的仓库、更新渠道和已保存的设置。切换引擎会保留 `glsl-shaders` 中的其他着色器；请避免同时启用会重写整个着色器列表的其他插件。

## 🛠️ 从源码构建

### 环境需求
* 已安装 [IINA](https://iina.io/) 的 **macOS** 系统
* **Node.js** 与 **npm**
* **Python 3**
* **Git**（需支持 submodule 子模块，用于拉取上游 Anime4K 与 AnimeJaNai 资源）

### 构建指令
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
执行完毕后，仓库根目录下即可生成打包好的最新插件包 `animeenhancer.iinaplgz`。

## 🤝 参与开发与贡献 (Contributing)

我们非常欢迎社区开发者提交 Pull Request 与共建！在参与开发前，请务必阅读我们的 [**开发者贡献指南 (CONTRIBUTING.md)**](../CONTRIBUTING.md)，里面详细说明了本地开发环境配置、版本号自增规范 (`ghVersion`) 以及 AnimeJaNai 模型转换。

### 核心项目结构
* `src/index.js` — 插件核心运行时（着色器自动配置、状态持久化、菜单同步、OSD 消息与自动加载逻辑）。
* `src/engines.js` — 引擎注册表、控件、默认设置与着色器链路。
* `src/shader-controller.js` — 着色器归属管理，保留其他着色器。
* `src/shaders.js` — Fast 与 HQ 两档着色器链路与参数映射。
* `src/i18n.js` — 全量 54 种语言本地化词典与系统语种检测引擎。
* `ui/sidebar/` — 侧边栏 Web UI 的前端交互与样式定义。
* `build-shaders.py` — 将 Anime4K 着色器及预先转换的 AnimeJaNai 着色器捆绑生成 `src/shaders-data.js`。
* `generate-pref.py` — 偏好设置页面静态多语言接口生成器（生成 `pref.html`）。

插件源码采用 GPL-3.0，Anime4K 着色器采用 MIT 许可；AnimeJaNai 模型权重及转换后的形式保留 CC BY-NC-SA 4.0 许可。署名与来源版本见 [THIRD_PARTY.md](../THIRD_PARTY.md)。

## 🤝 社区与友情链接

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
