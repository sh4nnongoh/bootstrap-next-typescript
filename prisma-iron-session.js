const { execSync } = require("child_process");
const { setJsonFileProps } = require("./utils/setJsonFileProps");
execSync("node ./bootstrap-next-typescript/prisma.js");
// execSync("mkdir -p src/types src/tests/data");
execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/src/* src/");
// execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/src/pages/* src/pages/");
// execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/src/types/* src/types/");
// execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/src/utils/* src/utils/");
// execSync("cp -r ./bootstrap-next-typescript/prisma-iron-session/src/tests/data/* src/tests/data/");
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
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript/prisma-iron-session'");
