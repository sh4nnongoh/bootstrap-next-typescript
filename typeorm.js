const { execSync } = require("child_process");
const fs = require("fs");
execSync("mkdir -p data src/entities src/migrations src/services src/repositories");
execSync("cp -r ./bootstrap-next-typescript/typeorm/src/entities/* src/entities");
execSync("cp ./bootstrap-next-typescript/typeorm/src/dataSource.ts src/");
execSync("yarn add -D sqlite3 ts-node");
execSync("yarn add typeorm reflect-metadata");
const tsconfig = fs.readFileSync("tsconfig.json", { encoding: "utf8" });
const tsconfigProps = JSON.parse(tsconfig);
const updatedTsconfigProps = {
  ...tsconfigProps,
  compilerOptions: {
    ...tsconfigProps.compilerOptions,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false
  }
};
fs.writeFileSync("tsconfig.json", JSON.stringify(updatedTsconfigProps, null, 2));
const eslint = fs.readFileSync(".eslintrc.json", { encoding: "utf8" });
const eslintProps = JSON.parse(eslint);
const updatedEslintProps = {
  ...eslintProps,
  rules: {
    ...eslintProps.rules,
    "class-methods-use-this": [0],
    "lines-between-class-members": [0]
  }
};
fs.writeFileSync(".eslintrc.json", JSON.stringify(updatedEslintProps, null, 2));
const packageJson = fs.readFileSync("package.json", { encoding: "utf8" });
const packageJsonProps = JSON.parse(packageJson);
const updatedPackageJsonProps = {
  ...packageJsonProps,
  scripts: {
    ...packageJsonProps.scripts,
    "typeorm": "TS_NODE_COMPILER_OPTIONS='{\"module\":\"commonjs\"}' node --require ts-node/register ./node_modules/typeorm/cli.js",
    "typeorm:cfg": "yarn typeorm -d ./src/dataSource.ts",
    "migration:gen": "yarn typeorm:cfg migration:generate -p",
    "migrate": "yarn typeorm:cfg migration:run",
    "migrate:revert": "yarn typeorm:cfg migration:revert"
  }
};
fs.writeFileSync("package.json", JSON.stringify(updatedPackageJsonProps, null, 2));
const gitIgnore = fs.readFileSync(".gitignore", { encoding: "utf8" });
const updatedGitIgnore = `${gitIgnore}\ndata\n`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
execSync("yarn migration:gen ./src/migrations/user-create");
execSync("yarn migrate");
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript/typeorm'");
