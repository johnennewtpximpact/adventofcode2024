export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.ts'], // Match your test files
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json', // Use your existing TypeScript configuration
    },
  },
};
