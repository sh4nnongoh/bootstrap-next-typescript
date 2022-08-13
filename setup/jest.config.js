const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./"
});
module.exports = createJestConfig({
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1"
  },
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "/bootstrap-next-typescript/",
    "/node_modules/",
    "/.next/"
  ],
  collectCoverageFrom: [
    "."
  ],
  coverageThreshold: {
    global: {
      lines: 90
    }
  },
  coveragePathIgnorePatterns: []
});
