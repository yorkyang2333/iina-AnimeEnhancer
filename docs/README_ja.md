<div align="center">

# 🌸 AnimeEnhancer for IINA

**IINA 向けアニメ画質向上プラグイン**

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

**AnimeEnhancer for IINA** は、[IINA](https://iina.io/) 向けのアニメ画質向上プラグインです。

## ✨ 主な機能・特徴

* 🚀 **IINA ネイティブな操作性**：専用の AnimeEnhancer サイドバー、macOS メニューバー、そして IINA 原生 OSD 通知を通じて、動画再生を中断することなく全てのコントロールが可能です。
* 🧩 **2つの高画質化エンジン**：Anime4K と実験的な AnimeJaNai を切り替え、エンジンごとに設定を保存。AnimeJaNai は **Quality / Balanced / Performance** の **2×** 超解像プロファイルを提供します。
* 🌐 **全 54 言語対応**：IINA 公式の 54 言語とシステム言語検出に対応。新しいエンジン説明は英語、簡体字中国語、繁体字中国語、日本語、ロシア語に翻訳され、その他の言語では英語を表示します。
* ⚖️ **2つの画質モード（クオリティティアー） (Anime4K)**：
  * **Fast**：軽量かつ高速。標準の Apple Silicon チップや Intel Mac 向けに最適化されています。
  * **HQ**：マルチパス構成の高品質シェーダーを有効化。ハイエンド GPU（M シリーズの Pro/Max/Ultra チップ）を搭載したマシンに最適です。
* 🎛️ **6つのプリセット構成 (Anime4K)**：**Mode A、B、C、A+A、B+B、C+A** を、動画再生中いつでもリアルタイムで切り替え可能です。
* 🔄 **スマート自動適用（Auto-Apply）**：新しい動画を読み込む際、前回選択した画質ティアーとシェーダーモードを自動的に復元します。
* ⌨️ **クイックショートカット**：Anime4K は `1`–`6` でモード、`7` で Fast、`8` で HQ に切替。AnimeJaNai は `1` / `2` / `3` で Quality / Balanced / Performance に切替。`0` で高画質化を無効にします。

## 📖 プリセットガイド

| プリセット | おすすめの開始点と適した用途 |
| :---: | :--- |
| **Mode A** | 一般的な **1080p アニメ**、および多少のボケや画質劣化が見られる動画 |
| **Mode B** | **720p アニメ**、または Mode A だとシャープさが強すぎたり不自然に見える動画 |
| **Mode C** | **480p / SD 画質アニメ**、ノイズが多い動画、または事前のデノイズ処理が必要な動画 |
| **Mode A+A** | 2段階（ダブルパス）Mode A 構成。最高の画質を提供しますが、GPU 負荷が高くシャープネスも強力です |
| **Mode B+B** | 2段階（ダブルパス）Mode B 構成。最高の画質を提供しますが、GPU 負荷が高くシャープネスも強力です |
| **Mode C+A** | Mode C のデノイズと再構築を組み合わせた構成。処理が困難な低解像度動画に最適です |

> [!TIP]
> ほとんどのアニメ動画は、まず **Fast + Mode A** から試すことをお勧めします。Mac の GPU 性能に余裕がある場合は、**HQ** やダブルパスモード（`A+A`、`B+B`、`C+A`）にアップグレードしてみてください。シャープネスがかかりすぎたり、ノイズやリンギング（白い縁取り）が目立つ場合は、より穏やかな Mode B や Mode C に切り替えてください。

上の表は **Anime4K** 用です。**AnimeJaNai** は事前変換済みの V3.1 モデルを IINA の OpenGL レンダラーで実行します。HD Quality と Balanced は現在 V3.1 Balanced モデルを共有し、Performance は V3.1 Performance を使用します。Windows プレイヤーの独立した SD チェーンと解像度に応じたモデル選択は未移植です。シェーダーと重みは同梱され、通常のビルドや再生で ONNX 変換、Python 推論環境、Windows プレイヤーは不要です。初回は GPU ドライバーによる GLSL コンパイルが必要です。このバックエンドは実験段階で、大量の GPU メモリーを使用する場合があり、HD 動画のリアルタイム再生は保証しません。

## 🚀 インストールと使い方

<div align="center">
  <img src="https://iina.io/img/blog/150-release/plugin-store.png" alt="IINA プラグインストア" width="600" />
</div>

### 方法 1: IINA プラグインストアからインストール（推奨、IINA ≥ 1.5.0）

1. **IINA** を開き、**設定** (`⌘,`) → **プラグイン** に移動します。
2. **プラグインを取得…**（Get Plugins…）ボタンをクリックしてプラグインストアを開きます。
3. GitHub URL 入力欄に `yorkyang2333/iina-anime4k` と入力し、**Install** をクリックします。

### 方法 2: ローカル / オフラインインストール

1. [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases) ページから最新の `animeenhancer.iinaplgz` プラグインパッケージをダウンロードします。
2. IINA の **設定** (`⌘,`) → **プラグイン** を開き、**ローカルパッケージをインストール…**（Install Local Package…）ボタンをクリックして、ダウンロードした `animeenhancer.iinaplgz` ファイルを選択すれば完了です。

---

### 使い方

アニメ動画を開き、IINA のサイドバーを表示して **AnimeEnhancer** タブに切り替え、エンジンとお好みの画質ティアー・モードを選択してください！初期状態では高画質化は無効です。識別子は `com.yorkyang2333.anime4k` で、従来の Anime4K プラグインと同じリポジトリと更新経路を使用し、保存済みの設定を引き継ぎます。エンジンを切り替えても `glsl-shaders` 内の他のシェーダーは保持されます。リスト全体を書き換える別のプラグインとの同時使用は避けてください。

## 🛠️ ソースコードからのビルド

### 必要環境
* [IINA](https://iina.io/) がインストールされた **macOS**
* **Node.js** および **npm**
* **Python 3**
* **Git**（上流の Anime4K と AnimeJaNai のリソースを取得するため submodule サポートが必要）

### ビルド手順
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
ビルドが完了すると、リポジトリのルートディレクトリにパッケージ化されたプラグイン `animeenhancer.iinaplgz` が生成されます。

## 🤝 開発への参加と貢献 (Contributing)

プルリクエストや開発への参加を心より歓迎いたします！開発を始める前に、必ず [**開発者貢献ガイド (CONTRIBUTING.md)**](../CONTRIBUTING.md) をお読みください。ローカル開発環境の構築、バージョン番号の更新ルール (`ghVersion`)、AnimeJaNai モデルの変換について詳しく説明しています。

### 構成ファイル
* `src/index.js` — プラグインのコアランタイム（シェーダー設置、状態永続化、メニュー同期、OSD メッセージ、自動適用ロジック）。
* `src/engines.js` — エンジン登録、操作項目、既定値、シェーダーチェーン。
* `src/shader-controller.js` — 他のシェーダーを保持するシェーダー所有権管理。
* `src/shaders.js` — Fast および HQ シェーダーチェーンの設定とパラメータマッピング。
* `src/i18n.js` — 全 54 言語のローカライズ辞書とシステム言語検出エンジン。
* `ui/sidebar/` — IINA サイドバー向け Web UI のコンポーネントとスタイリング。
* `build-shaders.py` — Anime4K と事前変換済み AnimeJaNai シェーダーを `src/shaders-data.js` にまとめます。
* `generate-pref.py` — 静的な多言語設定ページ生成スクリプト（`pref.html` を生成）。

プラグインのソースは GPL-3.0、Anime4K シェーダーは MIT ライセンスです。AnimeJaNai のモデル重みと変換後の形式は CC BY-NC-SA 4.0 を維持します。帰属情報とソースのリビジョンは [THIRD_PARTY.md](../THIRD_PARTY.md) を参照してください。

## 🤝 コミュニティ＆リンク

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
