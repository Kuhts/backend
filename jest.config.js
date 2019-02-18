module.exports = {
  collectCoverageFrom: [
    'server/**/*',
    'db/**/*.{js}'
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  // moduleNameMapper: {
  //   '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
  //   '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     '<rootDir>/internals/mocks/image.js',
  // },
  // setupFilesAfterEnv: ['<rootDir>/internals/testing/test-bundler.js'],
  // setupFiles: ['raf/polyfill', '<rootDir>/internals/testing/enzyme-setup.js'],
  testRegex: '.*\\.test\\.js$',
  // snapshotSerializers: ['enzyme-to-json/serializer'],
}
