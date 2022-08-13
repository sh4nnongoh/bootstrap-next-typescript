const { execSync } = require("child_process");
const fs = require("fs");
execSync("cp -r ./bootstrap-next-typescript/setup/scripts .");
execSync("cp -r ./bootstrap-next-typescript/setup/.vscode .");
execSync("cp -r ./bootstrap-next-typescript/setup/__tests__ .");
execSync("cp ./bootstrap-next-typescript/setup/.eslintignore .eslintignore");
execSync("cp ./bootstrap-next-typescript/setup/.eslintrc.json .eslintrc.json");
execSync("cp ./bootstrap-next-typescript/setup/jest.config.js jest.config.js");
execSync("cp ./bootstrap-next-typescript/setup/jest.setup.js jest.setup.js");
execSync("cp ./bootstrap-next-typescript/setup/types.d.ts types.d.ts");
execSync("cp ./bootstrap-next-typescript/setup/postcss.config.js ./postcss.config.js");
execSync("cp ./bootstrap-next-typescript/setup/tailwind.config.js ./tailwind.config.js");
execSync("yarn add tailwindcss postcss autoprefixer");
execSync("yarn add -D install-peerdeps cross-env husky");
execSync("yarn install-peerdeps -D eslint-config-airbnb --yarn");
execSync("yarn add -D eslint-config-next");
execSync("yarn add -D jest jest-environment-jsdom @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event");
const packageJson = fs.readFileSync("package.json", { encoding: "utf8" });
const packageJsonProps = JSON.parse(packageJson);
const updatedPackageJsonProps = {
  ...packageJsonProps,
  scripts: {
    ...packageJsonProps.scripts,
    lint: "next lint -d .",
    "lint:fix": "next lint -d . --fix",
    test: "jest",
    "update-version": "node scripts/update-version.js"
  }
};
fs.writeFileSync("package.json", JSON.stringify(updatedPackageJsonProps, null, 2));
const app = fs.readFileSync("pages/_app.tsx", { encoding: "utf8" });
const updatedApp = `/* eslint-disable react/jsx-props-no-spreading */\n${app}`;
fs.writeFileSync("pages/_app.tsx", updatedApp);
const globalCss = fs.readFileSync("styles/globals.css", { encoding: "utf8" });
const updatedGlobalCss = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${globalCss}`;
fs.writeFileSync("styles/globals.css", updatedGlobalCss);
execSync("yarn lint:fix");
execSync("yarn husky install");
execSync("yarn husky add .husky/pre-commit \"yarn lint && yarn test\"");
execSync("yarn husky add .husky/pre-commit \"yarn update-version && git add package.json\"");
execSync("git reset");
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript'");
