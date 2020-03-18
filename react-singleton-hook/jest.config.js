const defaults = {
  testURL: 'http://localhost'
};

const testFolderPath = folderName => `<rootDir>/test/${folderName}/**/*.spec.js`;

const NORMAL_TEST_FOLDERS = ['components', 'integration'];

const standardConfig = {
  ...defaults,
  displayName: 'ReactDOM',
  testMatch: NORMAL_TEST_FOLDERS.map(testFolderPath),
};

const rnConfig = {
  ...defaults,
  displayName: 'React Native',
  testMatch: [testFolderPath('react-native')],
  preset: 'react-native',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  }
};

module.exports = {
  projects: [standardConfig, rnConfig],
  // the last project overriders the coverage, so coverage from CI is not useful. use this two for local testing:
  //projects: [standardConfig],
  //projects: [rnConfig],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coverageReporters: ['json', 'text', 'html'],
};
