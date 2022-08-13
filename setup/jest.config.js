const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./"
});
module.exports = createJestConfig({
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.tsx"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1"
  },
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "/bootstrap-next-typescript/",
    "/node_modules/",
    "/.next/"
  ],
  collectCoverageFrom: [
    "./**/*.{ts,tsx}"
  ],
  coverageThreshold: {
    global: {
      lines: 90
    }
  },
  coveragePathIgnorePatterns: []
});
