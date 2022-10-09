const { execSync } = require("child_process");
const fs = require("fs");
execSync("cp -r ./bootstrap-next-typescript/highcharts/src/* src");
execSync("yarn add highcharts highcharts-react-official");
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add -- . ':!bootstrap-next-typescript'");
execSync("git commit -m 'arch: bootstrap-next-typescript/highcharts'");
