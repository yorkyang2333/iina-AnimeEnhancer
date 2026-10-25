# Contributing to AnimeEnhancer

Use `npm ci`, `npm test` and `npm run pack` for normal development. Python 3 is used for shader bundling and the inherited multilingual preferences generator. When a local `.venv` or `venv` exists, the build uses its interpreter. Normal builds bundle the preconverted AnimeJaNai profile shaders from `AnimeJaNai/ports/mpv-glsl/shaders/`; ONNX conversion is an explicit maintenance operation.

The engine registry in `src/engines.js` owns engine-specific presets, the official AnimeJaNai Quality/Balanced/Performance labels and defaults. Keep playback state in `src/index.js` and shader ownership in `src/shader-controller.js`. A successful change should preserve unrelated mpv shaders, keep separate engine selections, and leave the last successful selection intact if mpv rejects a shader-list update. IINA's JavaScript command bridge does not report GPU shader compilation errors; inspect mpv logs when verifying new shaders.

The plugin identifier is `com.yorkyang2333.AnimeEnhancer`, with updates sourced from `yorkyang2333/iina-AnimeEnhancer`. Keep `version` consistent in `Info.json`, `package.json` and the lockfile. For subsequent releases, increment `ghVersion` by exactly one from its existing integer value. Build outputs (`dist/`, `src/shaders-data.js`, `generated/`, `.iinaplugin` and `.iinaplgz`) are ignored. The preconverted AnimeJaNai profile shaders are versioned model resources and is deliberately checked in so ordinary builds and playback never need ONNX conversion.

## Regenerating the AnimeJaNai resource

The converter intentionally supports the pinned, audited SPANF3 graph. Its checksum guard prevents silently interpreting a different preprocessing graph as this model. Updating the upstream model requires inspecting the graph, updating provenance, regenerating the shader and comparing the GPU result against ONNX Runtime.

```sh
python3.13 -m venv .venv
.venv/bin/python -m pip install -r requirements-test.txt
npm run convert:animejanai
```

The converter accepts `--model`, `--metadata` and `--output` for use in the upstream fork. It packs four channels per RGBA texel, tiles channel groups spatially, and stores convolution weights in immutable float textures. It implements reflected padding for odd image dimensions, pixel unshuffle, zero-padded convolution, ReLU, addition, Tanh, multiplication, channel concatenation, pixel shuffle and final cropping. It does not approximate model layers with Anime4K shaders.

## Core ML feasibility result

ONNX Runtime 1.31 with the CoreMLExecutionProvider was also measured on the M1 with a static 1920×1080 input and 3840×2160 output. `ALL` measured 281 ms/frame and `CPUAndGPU` measured 279 ms/frame after warm-up, with 57 of 60 graph nodes assigned to Core ML and the remaining shape and transfer work on the CPU. This is the same order as the GLSL path, so Core ML is retained as a benchmark tool rather than an IINA playback backend. Core ML conversion through `coremltools 9` does not accept ONNX directly; a native host integration would require a separate conversion or model-authoring path.

## Verifying model execution on macOS

Install mpv headers (for example, `brew install mpv`) and use the actual target IINA app's libmpv. The following creates an offscreen OpenGL context, executes the shader through the same renderer API used by IINA, and compares the output to CPU ONNX Runtime. It does not install the plugin into IINA or modify IINA's configuration.

```sh
clang -Wno-deprecated-declarations -I "$(brew --prefix mpv)/include" tests/render-mpv.c -framework OpenGL /Applications/IINA.app/Contents/Frameworks/libmpv.2.dylib -Wl,-rpath,/Applications/IINA.app/Contents/Frameworks -o .venv/render-mpv
.venv/bin/python tests/verify-animejanai.py
```

The comparison covers even and odd dimensions and a larger 256×144 input, using normal half-float intermediate buffers. Results and renderer logs are written to `generated/`. This checks numerical correctness and shader compilation; it is not an HD real-time playback benchmark. `AJN_FBO_FORMAT=rgba32f` can be used to diagnose precision differences.

The inherited preferences page keeps a hidden text input proxy for the language selector, because IINA's preferences bridge does not persist `<select data-pref-key>` directly. Retain this pattern and the 54-locale coverage when editing `generate-pref.py`.
