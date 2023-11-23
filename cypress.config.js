const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: "./cypress/fixtures",
  screenshotsFolder: "./cypress/screenshots",
  videosFolder: "./cypress/videos",
  env: {
    APP_HOST: "https://blessed-monthly-mongoose.ngrok-free.app",
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
