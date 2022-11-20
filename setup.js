const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./lib/setJsonFileProps.js");
const gitIgnore = fs.readFileSync(".gitignore", { encoding: "utf8" });
const updatedGitIgnore = `${gitIgnore}\nbootstrap-next-typescript`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
execSync("mkdir -p src src/hooks src/contexts src/ui src/lib src/tests src/types");
execSync("mv styles src/");
execSync("rm -rf pages");
execSync("cp -r ./bootstrap-next-typescript/setup/* .");
execSync("cp -r ./bootstrap-next-typescript/setup/.vscode .");
execSync("cp ./bootstrap-next-typescript/setup/.eslintignore .");
execSync("cp ./bootstrap-next-typescript/setup/.eslintrc.json .");
execSync("yarn add lodash dotenv");
execSync("yarn add -D tailwindcss postcss autoprefixer");
execSync("yarn add -D install-peerdeps cross-env husky");
execSync("yarn install-peerdeps -D eslint-config-airbnb --yarn");
execSync("yarn add -D eslint-config-next");
execSync("yarn add -D jest jest-environment-jsdom ts-jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/lodash supertest @types/supertest");
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "prepare": "husky install",
    "lint": "next lint -d .",
    "lint:fix": "next lint -d . --fix",
    "update-version": "node scripts/update-version.js",
    "test": "yarn test:frontend && yarn test:backend",
    "test:frontend": "jest -c jest.frontend.config.js",
    "test:backend": "jest -c jest.backend.config.js -i src/tests/api/"
  }
})
const app = fs.readFileSync("src/pages/_app.tsx", { encoding: "utf8" });
const updatedApp = `/* eslint-disable react/jsx-props-no-spreading */\n${app}`;
fs.writeFileSync("src/pages/_app.tsx", updatedApp);
const globalCss = fs.readFileSync("src/styles/globals.css", { encoding: "utf8" });
const updatedGlobalCss = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${globalCss}`;
fs.writeFileSync("src/styles/globals.css", updatedGlobalCss);
execSync("yarn lint:fix");
execSync("yarn husky install");
execSync("yarn husky add .husky/pre-commit \"yarn lint && yarn test\"");
execSync("yarn husky add .husky/pre-commit \"yarn update-version && git add package.json\"");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript'");
