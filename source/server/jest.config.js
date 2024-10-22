/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/config/env/test.ts'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
}
