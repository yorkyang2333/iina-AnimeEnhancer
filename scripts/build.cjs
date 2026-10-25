const { existsSync, rmSync } = require("node:fs");
const { spawnSync } = require("node:child_process");
const { join } = require("node:path");
process.chdir(join(__dirname, ".."));
const python = existsSync(".venv/bin/python") ? ".venv/bin/python" : existsSync("venv/bin/python") ? "venv/bin/python" : "python3";
function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
rmSync("dist", { recursive: true, force: true });
run(python, ["build-shaders.py"]);
run(python, ["generate-pref.py"]);
run(process.execPath, ["node_modules/parcel/lib/bin.js", "build", "."]);
