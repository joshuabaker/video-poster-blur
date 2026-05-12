import { execFile } from "node:child_process";
import { access } from "node:fs/promises";
import assert from "node:assert/strict";

const CLI = new URL("../cli/index.mjs", import.meta.url).pathname;
const FIXTURE = new URL("fixture.mp4", import.meta.url).pathname;

function run(...args) {
  return new Promise((resolve, reject) => {
    execFile("node", [CLI, ...args], { encoding: "utf8" }, (err, stdout, stderr) => {
      resolve({ code: err?.code ?? 0, stdout, stderr });
    });
  });
}

async function hasFixture() {
  try {
    await access(FIXTURE);
    return true;
  } catch {
    return false;
  }
}

const fixture = await hasFixture();

if (fixture) {
  const { code, stdout, stderr } = await run(FIXTURE);
  assert.equal(code, 0, `should exit 0: ${stderr}`);
  assert.match(stdout, /^data:image\/png;base64,/, "should output a PNG data URI");
  console.error("PASS: default width");

  const { code: code2, stdout: stdout2 } = await run(FIXTURE, "--width", "20");
  assert.equal(code2, 0);
  assert.match(stdout2, /^data:image\/png;base64,/);
  assert.notEqual(stdout, stdout2, "different widths should produce different output");
  console.error("PASS: custom width");
} else {
  console.error("SKIP: no test fixture (test/fixture.mp4), skipping integration tests");
}

const { code: code3, stderr: stderr3 } = await run("nonexistent.mp4");
assert.notEqual(code3, 0, "should exit non-zero for missing file");
assert.match(stderr3, /not found/i);
console.error("PASS: missing file error");

const { code: code4, stderr: stderr4 } = await run();
assert.notEqual(code4, 0, "should exit non-zero with no args");
assert.match(stderr4, /required/i);
console.error("PASS: no args error");

const { code: code5, stderr: stderr5 } = await run("--help");
assert.equal(code5, 0);
assert.match(stderr5, /usage/i);
console.error("PASS: help flag");

console.error("\nAll tests passed.");
