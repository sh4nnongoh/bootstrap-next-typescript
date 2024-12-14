const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./lib/setJsonFileProps.js");
const { getJsonFileProp } = require("./lib/getJsonFileProp");
const gitIgnore = fs.readFileSync(".gitignore", { encoding: "utf8" });
const updatedGitIgnore = `${gitIgnore}\nbootstrap-next-typescript`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
execSync("rm -f .eslintrc.json eslint.config.mjs tailwind.config.ts src/app/page.tsx src/app/layout.tsx src/app/globals.css");
execSync("mkdir -p src src/hooks src/contexts src/ui src/lib src/types src/pages src/pages/api");
execSync("cp -r ./bootstrap-next-typescript/setup/* .");
execSync("cp -r ./bootstrap-next-typescript/setup/.vscode .");
execSync("cp ./bootstrap-next-typescript/setup/.env.development .");
execSync("cp ./bootstrap-next-typescript/setup/eslint.config.mjs .");
execSync("cp ./bootstrap-next-typescript/setup/.lintstagedrc .");
execSync("yarn add lodash dotenv ts-node clsx @heroicons/react");
execSync("yarn add -D install-peerdeps cross-env husky lint-staged");
execSync("yarn install-peerdeps -D eslint-config-airbnb --yarn");
// https://github.com/iamturns/eslint-config-airbnb-typescript#setup
execSync("yarn add -D eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser");
execSync("yarn add -D @tailwindcss/forms @tailwindcss/typography");
execSync("yarn add -D jest jest-environment-jsdom eslint-plugin-testing-library @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @testing-library/dom @types/lodash");
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint -d .",
    "lint:fix": "next lint -d . --fix",
    "update-version": "node scripts/update-version.js",
    "test": "yarn test:fe && yarn test:be",
    "test:fe": "jest -c jest-frontend.config.js --passWithNoTests --coverage",
    "test:be": "jest -c jest-backend.config.js -i src/pages/api/ --passWithNoTests --coverage",
  }
})
setJsonFileProps({
  filePath: "package.json",
  propsPath: "devDependencies",
  updatedProps: {
    ...getJsonFileProp({
      filePath: "package.json",
      propsPath: "devDependencies",
    }),
    "eslint": undefined,
  }
})
setJsonFileProps({
  filePath: "tsconfig.json",
  propsPath: "include",
  updatedProps: [
    "next-env.d.ts",
    "**/*.js",
    "**/*.mjs",
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
execSync("yarn add -D eslint");
execSync("rm -rf node_modules yarn.lock");
execSync("yarn");
execSync("yarn lint:fix");
execSync("yarn husky");
execSync("echo \"npx lint-staged && yarn test\" >> .husky/pre-commit");
execSync("echo \"yarn update-version && git add package.json\" >> .husky/pre-commit");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript'");
