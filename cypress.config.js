const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    specPattern: 'cypress/e2e/*.js',
    reporter: 'mochawesome',// Specify mochawesome as the reporter
    reporterOptions: {
      reportDir: 'cypress/reports/json', // Directory for saving the reports
      overwrite: false, // Avoid overwriting reports
      html: true, // Generate HTML reports
      json: true, // Generate JSON reports
    },
    headless: true,
    pageLoadTimeout: 120000, // <-- waits up to 2 minutes for page load
  },
});
