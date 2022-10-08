const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./utils/setJsonFileProps");
execSync("cp -r ./bootstrap-next-typescript/leaflet/src/* src/");
execSync("yarn add -D @types/leaflet");
execSync("yarn add leaflet react-leaflet");
const packageJsonProps = JSON.parse(fs.readFileSync("package.json", { encoding: "utf8" }));
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "test": `${packageJsonProps.scripts.test} --transformIgnorePatterns \"node_modules/(?!react-leaflet)/\"`
  }
})
const jestSetup = fs.readFileSync("src/tests/jest.setup.tsx", { encoding: "utf8" });
const jestPostfix = `
const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });
`
const updatedJestSetup = `${jestSetup}\n${jestPostfix}\n`;
fs.writeFileSync("src/tests/jest.setup.tsx", updatedJestSetup);
const globalsCss = fs.readFileSync("src/styles/globals.css", { encoding: "utf8" });
const globalsPostfix = `
.leaflet-container {
  width: 100%;
  height: 100vh;
}
.leaflet-control-attribution {
  display: flex;
}
`
const updatedGlobalsSetup = `${globalsCss}\n${globalsPostfix}\n`;
fs.writeFileSync("src/styles/globals.css", updatedGlobalsSetup);
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript/leaflet'");
