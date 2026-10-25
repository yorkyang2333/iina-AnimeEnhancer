"""Compare actual IINA OpenGL/libmpv model execution with ONNX Runtime."""
from pathlib import Path
import hashlib
import json
import subprocess
import time
import numpy as np
import onnxruntime as ort

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'generated'
OUT.mkdir(exist_ok=True)
session = ort.InferenceSession(str(ROOT / 'AnimeJaNai/BuildMpvUpscale2xAnimeJaNai/mpv-upscale-2x_animejanai/animejanai/onnx/2x_AnimeJaNai_HD_V3.1_Performance_SPANF3_b5f48_unshuffle_fp16.onnx'), providers=['CPUExecutionProvider'])
results = []
for width, height in [(32, 24), (33, 25), (256, 144)]:
    rng = np.random.default_rng(17)
    pixels = rng.integers(0, 256, (height, width, 3), dtype=np.uint8)
    source = OUT / f'input-{width}x{height}.ppm'
    output = source.with_suffix('.bin')
    source.write_bytes(f'P6\n{width} {height}\n255\n'.encode() + pixels.tobytes())
    x = (pixels.astype(np.float32) / 255).transpose(2, 0, 1)[None].astype(np.float16)
    expected = session.run(None, {'input': x})[0][0].transpose(1, 2, 0).astype(np.float32)
    start = time.monotonic()
    process = subprocess.run([str(ROOT / '.venv/render-mpv'), str(source), str(ROOT / 'AnimeJaNai/ports/mpv-glsl/shaders/AnimeJaNai_Performance.glsl'), str(output), str(width * 2), str(height * 2)], capture_output=True, text=True, timeout=120)
    elapsed = time.monotonic() - start
    log = process.stdout + process.stderr
    source.with_suffix('.log').write_text(log)
    assert process.returncode == 0 and 'ERROR' not in log and 'failed' not in log.lower(), log[-4000:]
    actual = np.fromfile(output, np.float32).reshape(height * 2, width * 2, 4)[..., :3]
    difference = np.abs(actual - expected)
    result = {'input': [width, height], 'output': [width * 2, height * 2], 'mae': float(difference.mean()), 'max_error': float(difference.max()), 'process_seconds': round(elapsed, 3)}
    print(json.dumps(result), flush=True)
    assert difference.mean() < 0.002 and difference.max() < 0.02, result
    results.append(result)
(OUT / 'verification.json').write_text(json.dumps(results, indent=2) + '\n')
