const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./utils/setJsonFileProps.js");
execSync("mkdir -p src src/hooks src/contexts src/views src/components src/utils src/tests");
execSync("cp -r ./bootstrap-next-typescript/setup/scripts .");
execSync("cp -r ./bootstrap-next-typescript/setup/.vscode .");
execSync("cp -r ./bootstrap-next-typescript/setup/tests src/");
execSync("cp -r ./bootstrap-next-typescript/setup/utils src/");
execSync("mv pages src/");
execSync("mv styles src/");
execSync("cp ./bootstrap-next-typescript/setup/.eslintignore .eslintignore");
execSync("cp ./bootstrap-next-typescript/setup/.eslintrc.json .eslintrc.json");
execSync("cp ./bootstrap-next-typescript/setup/jest.config.js jest.config.js");
execSync("cp ./bootstrap-next-typescript/setup/types.d.ts src/types.d.ts");
execSync("cp ./bootstrap-next-typescript/setup/postcss.config.js postcss.config.js");
execSync("cp ./bootstrap-next-typescript/setup/tailwind.config.js tailwind.config.js");
execSync("yarn add -D tailwindcss postcss autoprefixer");
execSync("yarn add -D install-peerdeps cross-env husky");
execSync("yarn install-peerdeps -D eslint-config-airbnb --yarn");
execSync("yarn add -D eslint-config-next");
execSync("yarn add -D jest jest-environment-jsdom @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event");
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "lint": "next lint -d .",
    "lint:fix": "next lint -d . --fix",
    "test": "jest",
    "update-version": "node scripts/update-version.js"
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
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript'");
