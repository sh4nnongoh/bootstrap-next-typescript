const { execSync } = require("child_process");
const fs = require("fs");
const gitIgnore = fs.readFileSync(".gitignore", { encoding: "utf8" });
const updatedGitIgnore = `${gitIgnore}\npublic/pspdfkit-lib`;
fs.writeFileSync(".gitignore", updatedGitIgnore);
const eslintignore = fs.readFileSync(".eslintignore", { encoding: "utf8" });
const updatedEslintignore = `${eslintignore}\npublic/`;
fs.writeFileSync(".eslintignore", updatedEslintignore);
execSync("cp -R ./bootstrap-next-typescript/pspdfkit/ .");
execSync("yarn add pspdfkit");
execSync("cp -R ./node_modules/pspdfkit/dist/pspdfkit-lib public/pspdfkit-lib")
execSync("yarn lint:fix");
execSync("git reset");
execSync("git add .");
execSync("git commit -m 'arch: bootstrap-next-typescript/pspdfkit'");
