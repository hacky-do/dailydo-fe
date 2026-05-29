import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const baseConfig: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

const jestConfig = async () => {
  const generated = await createJestConfig(baseConfig)();
  return {
    ...generated,
    moduleNameMapper: {
      '^.+\\.svg$': '<rootDir>/__mocks__/svg.tsx',
      ...generated.moduleNameMapper,
    },
  };
};

export default jestConfig;
