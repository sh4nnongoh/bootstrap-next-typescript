const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./lib/setJsonFileProps");
execSync("cp -r ./bootstrap-next-typescript/leaflet/src/* src/");
execSync("cp -r ./bootstrap-next-typescript/leaflet/public/* public/");
execSync("yarn add @types/leaflet");
execSync("yarn add leaflet react-leaflet");
const packageJsonProps = JSON.parse(fs.readFileSync("package.json", { encoding: "utf8" }));
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    ...packageJsonProps.scripts,
    "test:frontend": `${packageJsonProps.scripts["test:frontend"]} --transformIgnorePatterns \"node_modules/(?!react-leaflet)/\"`
  }
})
const jestSetup = fs.readFileSync("jest.setup.js", { encoding: "utf8" });
const jestPostfix = `
const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });
`
const updatedJestSetup = `${jestSetup}\n${jestPostfix}\n`;
fs.writeFileSync("jest.setup.js", updatedJestSetup);
const globalsCss = fs.readFileSync("src/app/globals.css", { encoding: "utf8" });
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
fs.writeFileSync("src/app/globals.css", updatedGlobalsSetup);
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript/leaflet'");
