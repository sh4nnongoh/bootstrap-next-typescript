const { execSync } = require("child_process");
const fs = require("fs");
const { setJsonFileProps } = require("./lib/setJsonFileProps");
execSync("mkdir -p prisma");
execSync("cp -r ./bootstrap-next-typescript/prisma/prisma/* prisma");
execSync("cp ./bootstrap-next-typescript/prisma/.env.local .");
execSync("npm i -g dotenv-cli");
execSync("yarn add prisma better-sqlite3 prisma-kysely");
execSync("yarn add kysely");
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
const updatedGitIgnore = `${gitIgnore}\ndb.sqlite\n`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript/prisma'");
