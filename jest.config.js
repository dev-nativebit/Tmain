module.exports = {
  preset: 'react-native',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!@react-native|react-native|@react-navigation)',
  ],
  setupFiles: ['./mocking.ts'],
};
