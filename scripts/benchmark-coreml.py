#!/usr/bin/env python3
"""Measure the original AnimeJaNai model with a static-shape CoreML EP graph.

This is an inference feasibility benchmark, not a player integration or an
end-to-end decode/inference/display performance claim.
"""
import argparse
import collections
import json
from pathlib import Path
import statistics
import time

import numpy as np
import onnx
import onnxruntime as ort

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--width', type=int, default=640)
    parser.add_argument('--height', type=int, default=360)
    parser.add_argument('--compute', default='ALL', choices=['ALL', 'CPUAndGPU', 'CPUAndNeuralEngine'])
    parser.add_argument('--runs', type=int, default=5)
    args = parser.parse_args()
    out = ROOT / 'generated/coreml' / f'{args.width}x{args.height}-{args.compute}'
    out.mkdir(parents=True, exist_ok=True)
    model = onnx.load(ROOT / 'AnimeJaNai/BuildMpvUpscale2xAnimeJaNai/mpv-upscale-2x_animejanai/animejanai/onnx/2x_AnimeJaNai_HD_V3.1_Performance_SPANF3_b5f48_unshuffle_fp16.onnx')
    for tensor, h, w in [(model.graph.input[0], args.height, args.width), (model.graph.output[0], args.height * 2, args.width * 2)]:
        tensor.type.tensor_type.shape.dim[2].dim_value = h
        tensor.type.tensor_type.shape.dim[3].dim_value = w
    del model.graph.value_info[:]
    fixed = out / 'static.onnx'
    onnx.save(model, fixed)
    options = ort.SessionOptions()
    options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_BASIC
    options.optimized_model_filepath = str(out / 'folded.onnx')
    options.log_severity_level = 3
    start = time.perf_counter()
    # Constant-fold the shape/padding prefix without inserting CPU-specific ops.
    prepare = ort.InferenceSession(str(fixed), sess_options=options, providers=['CPUExecutionProvider'])
    del prepare
    options = ort.SessionOptions()
    options.enable_profiling = True
    options.profile_file_prefix = str(out / 'profile')
    options.log_severity_level = 2
    providers = [('CoreMLExecutionProvider', {
        'ModelFormat': 'MLProgram', 'MLComputeUnits': args.compute,
        'RequireStaticInputShapes': '1', 'EnableOnSubgraphs': '0',
        'ModelCacheDirectory': str(out / 'cache'),
    }), 'CPUExecutionProvider']
    print(f'Creating {args.width}x{args.height} CoreML session ({args.compute})', flush=True)
    session = ort.InferenceSession(str(out / 'folded.onnx'), sess_options=options, providers=providers)
    setup = time.perf_counter() - start
    x = np.random.default_rng(17).random((1, 3, args.height, args.width)).astype(np.float16)
    durations = []
    result = None
    for index in range(args.runs + 2):
        start = time.perf_counter()
        result = session.run(None, {'input': x})[0]
        elapsed = (time.perf_counter() - start) * 1000
        print(f'run {index}: {elapsed:.2f} ms', flush=True)
        if index >= 2:
            durations.append(elapsed)
    profile = Path(session.end_profiling())
    nodes = [e for e in json.loads(profile.read_text()) if e.get('cat') == 'Node' and 'provider' in e.get('args', {})]
    counts = collections.Counter(e['args']['provider'] for e in nodes)
    data = {'width': args.width, 'height': args.height, 'compute': args.compute,
            'setup_seconds': setup, 'median_ms': statistics.median(durations),
            'min_ms': min(durations), 'max_ms': max(durations),
            'fps_equivalent': 1000 / statistics.median(durations),
            'provider_events': dict(counts), 'output_shape': list(result.shape),
            'finite_output': bool(np.isfinite(result).all()),
            'scope': 'Inference only, includes Python/session transfer overhead; excludes video decode, color conversion and presentation.'}
    (out / 'result.json').write_text(json.dumps(data, indent=2) + '\n')
    print(json.dumps(data, indent=2), flush=True)


if __name__ == '__main__':
    main()
