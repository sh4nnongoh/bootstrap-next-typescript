/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});
module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest-fe.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '/bootstrap-next-typescript/',
    '/node_modules/',
    '/.next/',
    '/src/pages/api/',
  ],
  collectCoverageFrom: [
    'src/**/!(layout).{tsx,ts,jsx,js}',
  ],
  coverageThreshold: {
    global: {
      lines: 1,
    },
  },
  coveragePathIgnorePatterns: [
    'src/pages/api/*',
  ],
});
