// Own only shaders installed in this plugin's data directory. Other plugins and
// user mpv.conf shaders retain their order when switching engines or disabling.
export function createShaderController(mpv, resolvePath, shaderNames) {
  const owned = new Set(shaderNames.map((name) => resolvePath(`@data/${name}`)));
  return {
    apply(names) {
      const before = mpv.getNative("glsl-shaders") || [];
      if (!Array.isArray(before)) throw new Error("Cannot read mpv glsl-shaders");
      const next = before.filter((path) => !owned.has(path)).concat(names.map((name) => resolvePath(`@data/${name}`)));
      mpv.set("glsl-shaders", next);
      const actual = mpv.getNative("glsl-shaders");
      if (!Array.isArray(actual) || JSON.stringify(actual) !== JSON.stringify(next)) {
        mpv.set("glsl-shaders", before);
        throw new Error("mpv did not accept the shader list");
      }
    },
  };
}
