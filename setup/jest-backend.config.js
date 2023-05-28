/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});
module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest-be.setup.ts'],
  testPathIgnorePatterns: [
    '/bootstrap-next-typescript/',
    '/node_modules/',
    '/.next/',
    'src!(/pages/api)',
  ],
  collectCoverageFrom: [
    'src/pages/api/**/!(.test|_*).{tsx,ts,jsx,js}',
  ],
  coverageThreshold: {
    global: {
      lines: 1,
    },
  },
  coveragePathIgnorePatterns: [],
});
