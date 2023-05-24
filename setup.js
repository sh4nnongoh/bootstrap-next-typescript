const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./lib/setJsonFileProps.js");
const gitIgnore = fs.readFileSync(".gitignore", { encoding: "utf8" });
const updatedGitIgnore = `${gitIgnore}\nbootstrap-next-typescript`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
execSync("rm .eslintrc.json");
execSync("mkdir -p src src/hooks src/contexts src/ui src/lib src/tests src/types src/pages src/pages/api");
execSync("cp -r ./bootstrap-next-typescript/setup/* .");
execSync("cp -r ./bootstrap-next-typescript/setup/.vscode .");
execSync("cp ./bootstrap-next-typescript/setup/.eslintignore .");
execSync("cp ./bootstrap-next-typescript/setup/.eslintrc.json .");
execSync("cp ./bootstrap-next-typescript/setup/.lintstagedrc .");
execSync("yarn add lodash dotenv");
execSync("yarn add -D install-peerdeps cross-env husky lint-staged");
execSync("yarn install-peerdeps -D eslint-config-airbnb --yarn");
// https://github.com/iamturns/eslint-config-airbnb-typescript#setup
execSync("yarn add -D eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser");
execSync("yarn add -D jest jest-environment-jsdom eslint-plugin-testing-library @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/lodash supertest @types/supertest");
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "prepare": "husky install",
    "lint": "next lint -d .",
    "lint:fix": "next lint -d . --fix",
    "update-version": "node scripts/update-version.js",
    "test": "yarn test:frontend && yarn test:backend",
    "test:frontend": "jest -c jest.config.js --passWithNoTests",
    "test:backend": "jest -c jest.config.js -i src/tests/api/ --passWithNoTests"
  }
})
setJsonFileProps({
  filePath: "tsconfig.json",
  propsPath: "include",
  updatedProps: [
    "next-env.d.ts",
    "**/*.js",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ]
})
setJsonFileProps({
  filePath: "tsconfig.json",
  propsPath: "exclude",
  updatedProps: ["node_modules", "bootstrap-next-typescript"]
})
setJsonFileProps({
  filePath: ".eslintrc.json",
  propsPath: "extends",
  updatedProps: ["airbnb", 'airbnb-typescript', "airbnb/hooks", "next/core-web-vitals"]
})
// const app = fs.readFileSync("src/pages/_app.tsx", { encoding: "utf8" });
// const updatedApp = `/* eslint-disable react/jsx-props-no-spreading */\n${app}`;
// fs.writeFileSync("src/pages/_app.tsx", updatedApp);
execSync("yarn lint:fix");
execSync("yarn husky install");
execSync("yarn husky add .husky/pre-commit \"npx lint-staged && yarn test\"");
execSync("yarn husky add .husky/pre-commit \"yarn update-version && git add package.json\"");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript'");
