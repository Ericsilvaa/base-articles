/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  testMatch: ['__tests__/**/*.test.ts'],
}

// collectCoverageFrom: ['**/app/**/*.ts'],
