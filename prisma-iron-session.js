const { execSync } = require("child_process");
const { setJsonFileProps } = require("./lib/setJsonFileProps");
const fs = require("fs");
execSync("node ./bootstrap-next-typescript/prisma.js");
execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/src/* src/");
execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/scripts/* scripts");
execSync("cp ./bootstrap-next-typescript/prisma-iron-session/src/config.ts src");
execSync("yarn add iron-session");
setJsonFileProps({
  filePath: "package.json",
  propsPath: "scripts",
  updatedProps: {
    "db:populate": "dotenv -e .env.local -- node ./scripts/db-add-user-events.js",
    "db:reset": "dotenv -e .env.local -- yarn prisma migrate reset && yarn db:populate"
  }
})
const jestSetup = fs.readFileSync("src/tests/jest.setup.ts", { encoding: "utf8" }).split('const environment');
const prefix = `
import { SET_INITIAL_DB_STATE } from "./api/constants";
`
const postfix = `
jest.mock("../lib/withIronSession", () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props
}));
beforeAll(async () => {
  await SET_INITIAL_DB_STATE();
});
`
const updatedJestSetup = `${jestSetup[0]}${prefix}\nconst environment${jestSetup[1]}\n${postfix}\n`;
fs.writeFileSync("src/tests/jest.setup.ts", updatedJestSetup);
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript/prisma-iron-session'");
