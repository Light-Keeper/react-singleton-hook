const testFolderPath = folderName => `<rootDir>/test/${folderName}/**/*.spec.js`;

const NORMAL_TEST_FOLDERS = ['components', 'integration'];

const standardConfig = {
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  displayName: 'ReactDOM',
  testMatch: NORMAL_TEST_FOLDERS.map(testFolderPath),
};

// eslint-disable-next-line no-unused-vars
const rnConfig = {
  displayName: 'React Native',
  testMatch: [testFolderPath('react-native')],
  preset: 'react-native',

  // this is not working anymore. Need to fix
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  }
};

module.exports = {
  //projects: [standardConfig, rnConfig],
  projects: [standardConfig],
  // the last project overriders the coverage, so coverage from CI is not useful. use this two for local testing:
  //projects: [standardConfig],
  //projects: [rnConfig],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coverageReporters: ['json', 'text', 'html'],
};
