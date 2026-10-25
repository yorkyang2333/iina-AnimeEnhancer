#!/usr/bin/env python3
"""Forward explicit model conversion to the pinned AnimeJaNai submodule."""
from pathlib import Path
import runpy

converter = Path(__file__).resolve().parents[1] / 'AnimeJaNai/ports/mpv-glsl/scripts/compile-animejanai.py'
if not converter.is_file():
    raise SystemExit('Missing AnimeJaNai converter. Run git submodule update --init --recursive.')
runpy.run_path(str(converter), run_name='__main__')
