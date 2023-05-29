const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./lib/setJsonFileProps.js");
const gitIgnore = fs.readFileSync(".gitignore", { encoding: "utf8" });
const updatedGitIgnore = `${gitIgnore}\nbootstrap-next-typescript`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
execSync("rm .eslintrc.json tailwind.config.js src/app/page.tsx src/app/layout.tsx src/app/globals.css");
execSync("mkdir -p src src/hooks src/contexts src/ui src/lib src/types src/pages src/pages/api");
execSync("cp -r ./bootstrap-next-typescript/setup/* .");
execSync("cp -r ./bootstrap-next-typescript/setup/.vscode .");
execSync("cp ./bootstrap-next-typescript/setup/.eslintignore .");
execSync("cp ./bootstrap-next-typescript/setup/.eslintrc.json .");
execSync("cp ./bootstrap-next-typescript/setup/.lintstagedrc .");
execSync("yarn add lodash dotenv ts-node clsx @heroicons/react @tailwindcss/forms @tailwindcss/typography");
execSync("yarn add -D install-peerdeps cross-env husky lint-staged");
execSync("yarn install-peerdeps eslint-config-airbnb --yarn");
// https://github.com/iamturns/eslint-config-airbnb-typescript#setup
execSync("yarn add eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser");
execSync("yarn add jest jest-environment-jsdom eslint-plugin-testing-library @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/lodash");
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "prepare": "husky install",
    "lint": "next lint -d .",
    "lint:fix": "next lint -d . --fix",
    "update-version": "node scripts/update-version.js",
    "test": "yarn test:fe && yarn test:be",
    "test:fe": "jest -c jest-frontend.config.js --passWithNoTests --coverage",
    "test:be": "jest -c jest-backend.config.js -i src/pages/api/ --passWithNoTests --coverage",
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
  propsPath: "ts-node",
  updatedProps: {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
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
execSync("yarn lint:fix");
execSync("yarn husky install");
execSync("yarn husky add .husky/pre-commit \"npx lint-staged && yarn test\"");
execSync("yarn husky add .husky/pre-commit \"yarn update-version && git add package.json\"");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript'");
