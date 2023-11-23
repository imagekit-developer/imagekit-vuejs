const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: "./cypress/fixtures",
  screenshotsFolder: "./cypress/screenshots",
  videosFolder: "./cypress/videos",
  env: {
    APP_HOST: "http://127.0.0.1:3000/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require("./cypress/plugins/index.js")(on, config);
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
  },
});
