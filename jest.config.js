module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFiles: ['<rootDir>/.jest/register-context.js'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/tests/**/*.test.(js|jsx|ts|tsx)|**/__snapshots__/*.(js|jsx|ts|tsx)"
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js', 
    '!src/router/index.js',
    '!**/node_modules/**'
  ],
  testURL: "http://localhost/"
};
