const { defineConfig } = require("cypress");
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');

async function setupNodeEvents(on, config) {
  // implement node event listeners here

  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on ('file:preprocessor', browserify.default(config));
  return config;

}

module.exports = defineConfig({
  //CONFIGURAMOS EL TIEMPO DE ESPERA GLOBAL DE la ide de CYPRESS DESDE VISUAL STUDIO CODE.
  defaultCommandTimeout: 5000,

  env: { 
    rahulShettyUrl: 'https://rahulshettyacademy.com/angularpractice/',
  },

  e2e: {
    setupNodeEvents,
    //specPattern:`cypress/integration/specs/*.js`,
    specPattern:`cypress/integration/specs/BDD/*.feature`,
  }
});
