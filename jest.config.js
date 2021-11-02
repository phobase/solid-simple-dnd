module.exports = {
  transform: {
    '.+\\.(ts|tsx|js)$': ['babel-jest', { configFile: './babel.config.test.json' }],
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.+\\.(css|scss)$': 'identity-obj-proxy',
    'solid-js/web': '<rootDir>/node_modules/solid-js/web/dist/web.cjs',
    'solid-js/store': '<rootDir>/node_modules/solid-js/store/dist/store.cjs',
    'solid-js': '<rootDir>/node_modules/solid-js/dist/solid.cjs',
  },
};
