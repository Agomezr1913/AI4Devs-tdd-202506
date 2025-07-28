const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testTimeout: 15000,
  roots: ['<rootDir>/src/tests'],
  transform: {
    ...tsJestTransformCfg,
  },
};