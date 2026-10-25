# AnimeEnhancer working agreements

These rules carry forward the Anime4K project's agent guidance, updated for AnimeEnhancer. Read CONTRIBUTING.md for model conversion and renderer verification details.

## Project identity and descriptions

- Use `Anime Enhancement Plugin for IINA` for the English project description in Info.json, package.json, the GitHub repository and plugin catalog listings. Use equivalent neutral wording in translated introductions. Keep specific engine support and limitations in feature documentation rather than making the short description depend on a fixed engine list or promising quality or real-time performance.
- The repository is `yorkyang2333/iina-anime4k`, the identifier is `com.yorkyang2333.anime4k`, and the package is `animeenhancer.iinaplgz`. Keep ghRepo and author.url pointed at this repository.
- Continue development in the original iina-anime4k repository and preserve the original plugin identifier and update channel. Do not deprecate this repository or direct users to a separate replacement plugin. Preserve saved Anime4K preferences during upgrades.

## Development and architecture

- Use a local `.venv` or `venv` interpreter when present. Normal builds bundle preconverted shaders and must not require ONNX conversion. If verification is blocked by a missing dependency, diagnose and install or configure it, then retry unless credentials, a license or a material user choice are required.
- Keep engine presets and defaults in src/engines.js, playback state in src/index.js, shader ownership in src/shader-controller.js, and sidebar behavior in ui/sidebar/. Preserve unrelated mpv shaders, separate engine settings and the last successful state when a shader-list update fails.
- Preserve the hidden input proxy for preference selectors; IINA does not persist `<select data-pref-key>` directly. Retain preference synchronization and all 54 supported locales in generate-pref.py.
- Keep bundled model attribution, licenses and provenance accurate. Describe AnimeJaNai as experimental and distinguish numerical renderer checks from live playback and real-time performance measurements.

## Releases

- Release only the version requested by the user. Keep version synchronized in Info.json, package.json and package-lock.json, including the root package entry. Read the existing integer ghVersion and increment it by exactly one for each new release; never derive it from the semantic version or reset it.
- Add a dated CHANGELOG.md entry with user-facing changes. Keep release titles and notes in English. Use the existing What's New, New Features & Improvements, Bug Fixes & Optimizations and changelog-link format where applicable, omitting empty sections.
- Run npm test, npm run pack and git diff --check before publishing. Inspect the archive's metadata, entry points and licenses. Do not commit dist/, src/shaders-data.js, generated/, plugin staging directories or .iinaplgz files. Preconverted model resources in the pinned submodule remain versioned inputs.
- Commit the intended source and metadata changes, create the requested v-prefixed tag and push the release commit and tag. Never move an already published tag. The tag workflow builds and attaches animeenhancer.iinaplgz; confirm the workflow outcome, public release notes and downloadable asset before reporting completion.

## Pull requests and documentation

- Open a PR only when explicitly requested; target upstream by default when working in a fork. Follow the repository's PR template.
- Write natural prose without hard line wraps or unnecessary sections. Do not repeat the PR title as a body heading or add validation/test sections to PR bodies. Preserve separate paragraphs only where they serve the content or existing format.
