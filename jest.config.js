/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
