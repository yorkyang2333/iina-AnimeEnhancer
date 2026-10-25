<div align="center">

# 🌸 AnimeEnhancer for IINA

**Плагин улучшения аниме для IINA**

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

**AnimeEnhancer for IINA** — плагин улучшения аниме для [IINA](https://iina.io/).

## ✨ Ключевые возможности

* 🚀 **Нативная интеграция с IINA**: Полный контроль через выделенную вкладку на боковой панели, верхнюю строку меню macOS и встроенные уведомления (OSD) прямо во время просмотра.
* 🧩 **Два движка улучшения**: Переключение между Anime4K и экспериментальным AnimeJaNai с отдельным сохранением настроек. AnimeJaNai предлагает профили **Quality / Balanced / Performance** с увеличением **2×**.
* 🌐 **Поддержка 54 языков**: Поддержка языков IINA и автоматического определения языка системы. Новые описания движков переведены на английский, упрощённый и традиционный китайский, японский и русский; для остальных языков используется английский.
* ⚖️ **Два уровня качества (Quality Tiers) (Anime4K)**:
  * **Fast**: Легковесный и быстрый режим, оптимизированный для стандартных чипов Apple Silicon и Intel Mac.
  * **HQ**: Продвинутые многопроходные цепочки шейдеров для производительных графических процессоров (чипы M-серии Pro/Max/Ultra).
* 🎛️ **Шесть пресетов (Anime4K)**: Мгновенное переключение между режимами **Mode A, B, C, A+A, B+B и C+A** прямо во время воспроизведения видео.
* 🔄 **Умное автоприменение (Auto-Apply)**: Автоматически восстанавливает выбранный режим улучшения и уровень качества при загрузке каждого нового видео.
* ⌨️ **Горячие клавиши**: Для Anime4K — `1`–`6` для пресетов, `7` для Fast и `8` для HQ; для AnimeJaNai — `1` / `2` / `3` для Quality / Balanced / Performance; `0` отключает улучшение.

## 📖 Руководство по пресетам

| Пресет | Рекомендуемое применение и начальный выбор |
| :---: | :--- |
| **Mode A** | Большинство аниме в разрешении **1080p**, а также видео с небольшой размытостью или артефактами сжатия |
| **Mode B** | Аниме в разрешении **720p**, либо видео, где Mode A выглядит слишком резким или неестественным |
| **Mode C** | Старое аниме в разрешении **480p / SD**, видео с заметным шумом, или контент, требующий первоначального шумоподавления |
| **Mode A+A** | Двухпроходная цепочка Mode A; высочайшее качество, повышенная нагрузка на GPU и более агрессивная резкость |
| **Mode B+B** | Двухпроходная цепочка Mode B; высочайшее качество, повышенная нагрузка на GPU и более агрессивная резкость |
| **Mode C+A** | Комбинация шумоподавления Mode C и дополнительной реконструкции деталей; идеально для сложных видео низкого разрешения |

> [!TIP]
> Для большинства аниме мы рекомендуем начать с комбинации **Fast + Mode A**. Если производительность вашего Mac позволяет, попробуйте переключиться на режим **HQ** или двухпроходные цепочки (`A+A`, `B+B`, `C+A`). Если изображение становится слишком резким, вокруг контуров появляются белые ореолы (рингинг) или усиливается шум, переключитесь на более мягкий режим Mode B или Mode C.

Таблица выше относится к **Anime4K**. **AnimeJaNai** выполняет заранее преобразованные модели V3.1 через OpenGL-рендерер IINA. Профили HD Quality и Balanced сейчас используют одну модель V3.1 Balanced, а Performance — V3.1 Performance. Отдельная цепочка SD и выбор модели по разрешению из Windows-плеера пока не перенесены. Шейдеры и веса включены в пакет; обычная сборка и воспроизведение не требуют преобразования ONNX, среды Python для инференса или Windows-плеера. При первом использовании драйвер GPU компилирует GLSL. Бэкенд экспериментальный, может потреблять много видеопамяти и не гарантирует воспроизведение HD в реальном времени.

## 🚀 Установка и использование

<div align="center">
  <img src="https://iina.io/img/blog/150-release/plugin-store.png" alt="Магазин плагинов IINA" width="600" />
</div>

### Способ 1: Установка через магазин плагинов IINA (Рекомендуется, IINA ≥ 1.5.0)

1. Откройте **IINA** и перейдите в **Настройки** (`⌘,`) → **Плагины**.
2. Нажмите кнопку **Скачать плагины…** (Get Plugins…), чтобы открыть окно магазина плагинов.
3. Введите `yorkyang2333/iina-AnimeEnhancer` в поле GitHub URL и нажмите **Install**.

### Способ 2: Ручная / офлайн установка

1. Перейдите на страницу [**Releases**](https://github.com/yorkyang2333/iina-AnimeEnhancer/releases) и скачайте актуальную версию пакета `animeenhancer.iinaplgz`.
2. Откройте IINA, перейдите в **Настройки** (`⌘,`) → **Плагины**, нажмите кнопку **Установить локальный пакет…** (Install Local Package…) и выберите скачанный файл `animeenhancer.iinaplgz`.

---

### Использование

Откройте любое аниме, вызовите боковую панель IINA, перейдите на вкладку **AnimeEnhancer**, выберите движок, уровень качества и режим! По умолчанию улучшение отключено. Идентификатор — `com.yorkyang2333.AnimeEnhancer`; исходный репозиторий переименован в iina-AnimeEnhancer. Из-за смены идентификатора установите плагин отдельно, отключите или удалите старый Anime4K и настройте параметры заново. При переключении движка другие шейдеры в `glsl-shaders` сохраняются; избегайте одновременного использования плагинов, перезаписывающих весь список.

## 🛠️ Сборка из исходного кода

### Требования к окружению
* **macOS** с установленным плеером [IINA](https://iina.io/)
* **Node.js** и **npm**
* **Python 3**
* **Git** (с поддержкой сабмодулей для загрузки ресурсов Anime4K и AnimeJaNai)

### Команды для сборки
```bash
git clone https://github.com/yorkyang2333/iina-AnimeEnhancer.git
cd iina-AnimeEnhancer
git submodule update --init --recursive
npm install
npm run pack
```
После завершения сборки в корневом каталоге репозитория появится готовый установочный пакет `animeenhancer.iinaplgz`.

## 🤝 Участие в разработке (Contributing)

Мы приветствуем pull request'ы и участие сообщества в развитии проекта! Перед началом разработки обязательно изучите наше [**Руководство для разработчиков (CONTRIBUTING.md)**](../CONTRIBUTING.md), где подробно описаны настройка локального окружения, правила обновления версий (`ghVersion`) и преобразование моделей AnimeJaNai.

### Структура проекта
* `src/index.js` — Ядро плагина (установка шейдеров, сохранение состояния, синхронизация меню, сообщения OSD и логика автоприменения).
* `src/engines.js` — Реестр движков, элементы управления, настройки по умолчанию и цепочки шейдеров.
* `src/shader-controller.js` — Управление шейдерами плагина с сохранением сторонних шейдеров.
* `src/shaders.js` — Конфигурация и привязка параметров для цепочек Fast и HQ.
* `src/i18n.js` — Полный словарь локализации на 54 языка и модуль определения системного языка.
* `ui/sidebar/` — Веб-интерфейс и стили для боковой панели IINA.
* `build-shaders.py` — Объединяет шейдеры Anime4K и заранее преобразованные шейдеры AnimeJaNai в `src/shaders-data.js`.
* `generate-pref.py` — Генератор статической страницы настроек на 54 языках (создает `pref.html`).

Исходный код плагина распространяется под GPL-3.0, шейдеры Anime4K — под MIT. Веса AnimeJaNai и их преобразованная форма сохраняют лицензию CC BY-NC-SA 4.0. Авторство и версии исходников указаны в [THIRD_PARTY.md](../THIRD_PARTY.md).

## 🤝 Сообщество и ссылки

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
