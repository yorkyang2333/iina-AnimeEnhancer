> [!WARNING]
> ## ⚠️ Anime4K for IINA 即将弃用
>
> ### [➡️ 下载 AnimeEnhancer for IINA](https://github.com/yorkyang2333/iina-AnimeEnhancer/releases/latest)
>
> ⚠️ **即将弃用：** Anime4K for IINA 即将 deprecated，请迁移至 [AnimeEnhancer for IINA](https://github.com/yorkyang2333/iina-AnimeEnhancer)。新插件包含 Anime4K 和实验性的 AnimeJaNai 引擎。安装[最新版本](https://github.com/yorkyang2333/iina-AnimeEnhancer/releases/latest)后，请先停用或卸载旧插件，再启用 AnimeEnhancer，避免着色器控制冲突。新插件使用独立标识符，需要单独安装并重新设置偏好。

---

<div align="center">

# 🌸 Anime4K for IINA

**macOS IINA 播放器实时动漫画质提升与超分辨率插件**

[![Release](https://img.shields.io/github/v/release/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FF69B4)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![Downloads](https://img.shields.io/github/downloads/yorkyang2333/iina-anime4k/total?style=for-the-badge&logo=github&color=00d1b2)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![IINA](https://img.shields.io/badge/IINA-%E2%89%A5%201.3.0-5865F2?style=for-the-badge&logo=apple&logoColor=white)](https://iina.io/)
[![macOS](https://img.shields.io/badge/macOS-11.0%2B-000000?style=for-the-badge&logo=apple&logoColor=white)](https://www.apple.com/macos/)
[![Stars](https://img.shields.io/github/stars/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FFD700)](https://github.com/yorkyang2333/iina-anime4k/stargazers)
[![Powered by Anime4K](https://img.shields.io/badge/Powered%20by-Anime4K-FF4500?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/bloc97/Anime4K)
[![Languages](https://img.shields.io/badge/Languages-54%20Locales-32CD32?style=for-the-badge&logo=googletranslate&logoColor=white)](https://github.com/yorkyang2333/iina-anime4k/blob/main/src/i18n.js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://github.com/yorkyang2333/iina-anime4k/blob/main/LICENSE)

[**English**](../README.md) • [**简体中文**](README_zh-Hans.md) • [**繁體中文**](README_zh-Hant.md) • [**日本語**](README_ja.md) • [**Русский**](README_ru.md)

</div>

---

**Anime4K for IINA** 是一款面向 macOS [IINA](https://iina.io/) 播放器的现代化插件，将著名的 [Anime4K](https://github.com/bloc97/Anime4K) 实时超分辨率 GLSL 着色器无缝嵌入 IINA。插件在首次启动时会自动将其内置着色器写入 IINA 插件数据目录，并在播放时通过 mpv 的 `glsl-shaders` 列表进行动态无感切换。您无需再手动修改 `mpv.conf` 配置文件或繁琐地维护着色器路径！

## ✨ 功能亮点

* 🚀 **无缝贴合 IINA 原生体验**：通过专属 Anime4K 侧边栏、macOS 顶部菜单栏和 IINA 原生 OSD 提示完成全部控制，操作顺滑不打断观影流程。
* 🌐 **54 国语言全量母语支持**：完整对齐 IINA 官方支持的全量 54 个语种，提供母语级 UI 翻译与智能操作系统语种检测。
* ⚖️ **双通道画质阶梯**：
  * **Fast**：轻量高效，针对 Apple Silicon 标准芯片与 Intel 机型深度优化。
  * **HQ**：启用高阶多通道复合着色器，适合搭载强劲 GPU（如 M 系列 Pro / Max / Ultra 芯片）的设备。
* 🎛️ **六组核心预设链路**：支持 **Mode A、B、C、A+A、B+B、C+A** 六大模式，播放过程中任意实时切换。
* 🔄 **智能自动应用**：开启后，载入新视频时会自动恢复您上一次选定的画质档位与着色器模式。
* ⌨️ **极速快捷键**：支持菜单快捷键（`1`–`6` 切换模式，`0` 关闭，`7` 切换 Fast 档，`8` 切换 HQ 档）。

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

## 🚀 安装与使用

<div align="center">
  <img src="https://iina.io/img/blog/150-release/plugin-store.png" alt="IINA 插件商店" width="600" />
</div>

### 方法一：通过 IINA 插件商店一键安装（推荐，IINA ≥ 1.5.0）

1. 打开 **IINA**，进入 **设置** (`⌘,`) → **插件**。
2. 点击 **获取插件…**（Get Plugins…）按钮打开插件商店面板。
3. 在左侧 **Community Plugins（社区插件）** 列表中找到 **Anime4K**，点击 **Install（安装）** 即可！
   *（也可以直接在顶部的 GitHub URL 输入框中输入 `yorkyang2333/iina-anime4k` 并点击 Install）*。

### 方法二：本地离线安装

1. 前往 [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases) 页面下载最新版本的 `anime4k.iinaplgz` 插件包。
2. 打开 IINA 进入 **设置** (`⌘,`) → **插件**，点击 **安装本地插件…**（Install Local Package…）按钮，选择下载的 `anime4k.iinaplgz` 文件即可完成安装。

---

### 快速上手

打开任意动画视频，呼出 IINA 侧边栏，切换到 **Anime4K** 标签页，尽情选择您喜爱的画质档位与预设模式！

## 🛠️ 从源码构建

### 环境需求
* 已安装 [IINA](https://iina.io/) 的 **macOS** 系统
* **Node.js** 与 **npm**
* **Python 3**
* **Git**（需支持 submodule 子模块，用于拉取上游 Anime4K 着色器）

### 构建指令
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
执行完毕后，仓库根目录下即可生成打包好的最新插件包 `anime4k.iinaplgz`。

## 🤝 参与开发与贡献 (Contributing)

我们非常欢迎社区开发者提交 Pull Request 与共建！在参与开发前，请务必阅读我们的 [**开发者贡献指南 (CONTRIBUTING.md)**](../CONTRIBUTING.md)，里面详细说明了本地开发环境配置、版本号自增规范 (`ghVersion`) 以及 IINA 的自动化发版架构与打包逻辑。

### 核心项目结构
* `src/index.js` — 插件核心运行时（着色器自动配置、状态持久化、菜单同步、OSD 消息与自动加载逻辑）。
* `src/shaders.js` — Fast 与 HQ 两档着色器链路与参数映射。
* `src/i18n.js` — 全量 54 种语言本地化词典与系统语种检测引擎。
* `ui/sidebar/` — 侧边栏 Web UI 的前端交互与样式定义。
* `build-shaders.py` — 预编译脚本，读取并解析 `Anime4K/glsl/**/*.glsl`，捆绑生成 `src/shaders-data.js`。
* `generate-pref.py` — 偏好设置页面静态多语言接口生成器（生成 `pref.html`）。

## 🤝 社区与友情链接

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
