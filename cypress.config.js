const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //CONFIGURAMOS EL TIEMPO DE ESPERA GLOBAL DE la ide de CYPRESS DESDE VISUAL STUDIO CODE.
  defaultCommandTimeout: 5000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:`cypress/integration/specs/*.js`,
  }
});
