const { execSync } = require("child_process");
const { setJsonFileProps } = require("./lib/setJsonFileProps");
const fs = require("fs");
const { getJsonFileProp } = require("./lib/getJsonFileProp");
execSync("mkdir -p prisma");
execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/* .");
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
    "db:migrate": "yarn prisma migrate dev",
    "db:populate": "ts-node ./scripts/db-add-user-events.ts",
    "db:reset": "yarn prisma migrate reset && yarn db:populate"
  }
})
const jestBeSetup = fs.readFileSync("jest-be.setup.ts", { encoding: "utf8" });
const updatedJestBeSetup = `${jestBeSetup}\n
import { SET_INITIAL_DB_STATE } from '@/test-utils';
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
const envFile = fs.readFileSync(".env.development", { encoding: "utf8" });
const updatedEnvFile = `${envFile}\n
DATABASE_URL="file:./db.sqlite"
\n`;
fs.writeFileSync(".env.development", updatedEnvFile);

execSync("yarn db:migrate --name create-user");
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript/prisma-iron-session'");
