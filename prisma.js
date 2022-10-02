const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./utils/setJsonFileProps");
execSync("mkdir -p prisma");
execSync("cp -r ./bootstrap-next-typescript/prisma/prisma/* prisma");
execSync("cp ./bootstrap-next-typescript/prisma/.env.local .");
execSync("npm i -g dotenv-cli");
execSync("yarn add -D prisma sqlite3");
execSync("yarn add @prisma/client");
setJsonFileProps({
  filePath: "package.json",
  propsPath: "prisma",
  updatedProps: {
    "schema": "./prisma/schema.prisma"
  }
})
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "db:migrate": "dotenv -e .env.local -- yarn prisma migrate dev"
  }
})
execSync("yarn db:migrate --name create-user");
const gitIgnore = fs.readFileSync(".gitignore", { encoding: "utf8" });
const updatedGitIgnore = `${gitIgnore}\nprisma/data\n`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript/prisma'");
