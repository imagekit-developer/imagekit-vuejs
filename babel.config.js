module.exports = {
  presets: [
    "@babel/env"
  ],
  env: {
    "test": {
      "plugins": ["require-context-hook"]
    }
  }
}
