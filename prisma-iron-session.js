const { execSync } = require("child_process");
const { setJsonFileProps } = require("./utils/setJsonFileProps");
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
    "test": "dotenv -e .env.local -- jest",
    "test:frontend": "jest src/tests/*.test.tsx",
    "test:backend": "dotenv -e .env.local -- yarn jest src/tests/api/*.test.ts",
    "db:populate": "dotenv -e .env.local -- node ./scripts/db-add-user-events.js",
    "db:reset": "dotenv -e .env.local -- yarn prisma migrate reset && yarn db:populate"
  }
})
const jestSetup = fs.readFileSync("src/tests/jest.setup.tsx", { encoding: "utf8" });
const mockString = `
jest.mock("../utils/withIronSession", () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props
}));
`
const updatedJestSetup = `${jestSetup}\n${mockString}\n`;
fs.writeFileSync("src/tests/jest.setup.tsx", updatedJestSetup);
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript/prisma-iron-session'");