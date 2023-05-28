const { execSync } = require("child_process");
const { setJsonFileProps } = require("./lib/setJsonFileProps");
const fs = require("fs");
const { getJsonFileProp } = require("./lib/getJsonFileProp");
execSync("mkdir -p prisma");
execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/* .");
execSync("cp ./bootstrap-next-typescript/prisma-iron-session/.env.local .");
execSync("npm i -g dotenv-cli");
execSync("yarn add @paralleldrive/cuid2 better-sqlite3 @types/better-sqlite3");
execSync("yarn add kysely prisma prisma-kysely iron-session");
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
    ...getJsonFileProp({
      filePath: "package.json",
      propsPath: "scripts",
    }),
    "db:migrate": "dotenv -e .env.local -- yarn prisma migrate dev",
    "db:populate": "dotenv -e .env.local -- ts-node ./scripts/db-add-user-events.ts",
    "db:reset": "dotenv -e .env.local -- yarn prisma migrate reset && yarn db:populate"
  }
})
const jestBeSetup = fs.readFileSync("jest-be.setup.ts", { encoding: "utf8" });
const updatedJestBeSetup = `${jestBeSetup}\n
import { SET_INITIAL_DB_STATE } from '@/pages/api/_test-utils';
beforeAll(async () => {
  await SET_INITIAL_DB_STATE();
});
\n`;
fs.writeFileSync("jest-be.setup.ts", updatedJestBeSetup);
const eslintIgnore = fs.readFileSync(".eslintignore", { encoding: "utf8" });
const updatedEslintIgnore = `${eslintIgnore}\n
src/types/schema.ts
\n`;
fs.writeFileSync(".eslintignore", updatedEslintIgnore);

execSync("yarn db:migrate --name create-user");
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript/prisma-iron-session'");
