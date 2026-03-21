import { execSync } from "child_process";
import { rmSync, existsSync, mkdirSync } from "fs";
import path from "path";

// Paths must be absolute when changing CWD
const swcBin = path.join(process.cwd(), "node_modules/.bin/swc");
const swcConfig = path.join(process.cwd(), ".swcrc");

async function runRustBuild(version: string) {
  const outDir = "dist_" + version;

  const iconsSrc = path.join(process.cwd(), "src_" + version + "/icons");
  const esmDist = path.join(process.cwd(), "dist_" + version + "/esm");
  const cjsDist = path.join(process.cwd(), "dist_" + version + "/cjs");

  console.log("🦀 Starting " + version + " Rust-powered build (SWC)...");

  // 1. Clean
  if (existsSync(outDir)) {
    console.time("Clean Output Dir Duration");
    rmSync(outDir, { recursive: true });
    console.timeEnd("Clean Output Dir Duration");
  }

  mkdirSync(outDir);

  console.time("Rust Build Duration");

  try {
    // 2. Build ESM
    console.log("📦 Generating ESM (Flat)...");
    execSync(
      `${process.execPath} ${swcBin} . -d ${esmDist} --config-file ${swcConfig}`,
      {
        stdio: "inherit",
        cwd: iconsSrc, // 👈 This makes SWC treat the icons folder as the "root"
      },
    );

    // 3. Build CJS (We override the module type for this pass)
    console.log("📦 Generating CJS (Flat)...");
    execSync(
      `${process.execPath} ${swcBin} . -d ${cjsDist} --config-file ${swcConfig} -C module.type=commonjs`,
      {
        stdio: "inherit",
        cwd: iconsSrc, // 👈 Same here
      },
    );

    console.log("✅ JS Build complete.");
  } catch (e) {
    console.error("❌ Rust build failed", e);
  }

  console.timeEnd("Rust Build Duration");

  // 4. Types (Still need tsc for this)
  console.log("📝 Generating types...");
  execSync("tsc -p tsconfig." + version + ".json --emitDeclarationOnly");
}
(async () => {
  console.time("Total Duration");
  await runRustBuild("v4");
  await runRustBuild("v5");
  console.timeEnd("Total Duration");
})();
