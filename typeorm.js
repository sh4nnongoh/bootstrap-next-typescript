const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./utils/setJsonFileProps");
execSync("mkdir -p data src/entities src/migrations src/services src/repositories");
execSync("cp -r ./bootstrap-next-typescript/typeorm/src/entities/* src/entities");
execSync("cp ./bootstrap-next-typescript/typeorm/src/dataSource.ts src/");
execSync("yarn add -D sqlite3 ts-node");
execSync("yarn add typeorm reflect-metadata");
setJsonFileProps({
  filePath: "tsconfig.json",
  propsPath: "compilerOptions",
  updatedProps: {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false
  }
})
setJsonFileProps({
  filePath: ".eslintrc.json",
  propsPath: "rules",
  updatedProps: {
    "class-methods-use-this": [0],
    "lines-between-class-members": [0]
  }
})
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "typeorm": "TS_NODE_COMPILER_OPTIONS='{\"module\":\"commonjs\"}' node --require ts-node/register ./node_modules/typeorm/cli.js",
    "typeorm:cfg": "yarn typeorm -d ./src/dataSource.ts",
    "migration:gen": "yarn typeorm:cfg migration:generate -p",
    "migrate": "yarn typeorm:cfg migration:run",
    "migrate:revert": "yarn typeorm:cfg migration:revert"
  }
})
const gitIgnore = fs.readFileSync(".gitignore", { encoding: "utf8" });
const updatedGitIgnore = `${gitIgnore}\ndata\n`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
execSync("yarn migration:gen ./src/migrations/user-create");
execSync("yarn migrate");
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript/typeorm'");
