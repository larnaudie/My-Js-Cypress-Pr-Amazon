"use stric"

/*
TIPS:

//PARA EJECUTAR LA INTERFAZ USAMOS:
npm run cypress:open
  //ASEGURARSE DE TENER:
  {
  "devDependencies": {
    "cypress": "^13.6.4"
  },
  "scripts": {
    "cypress:open": "cypress open"
  }
}

-------------EJECUTAR CYPRESS-----------------------------------------------------------------
//Para ejecutar todos los archivos spec en la carpeta package.json
./node_modules/.bin/cypress run

//Para ejecutar un spec file especifico, despues del fun colocar el nombre del spec que quiero
npx cypress run --spec “cypress/integration/my-spec.js”

//SI EJECUTAMOS ASI CYPRESS SE EJECUTARA INVISIBLE

//SI queremos que se ejecute visible la interfaz
./node_modules/.bin/cypress run --header
-
//Si queremos ejecutarlo en Electron:
$ cypress run --header
//Si queremos ejecutarlo en chrome
$ cypress run --browser chrome

-------cARPETAS Y SUS FUNCIONES-----------------------------------------------------------------
//Carpeta fixtures
Aca va a venir todos los datos que sean leidos de externos, como API JSONS, EXCEL
Podemos invocar los datos almacenados en fixtures con el comando: fixtures
//Carpeta integration
Ahi vamos a colocar todos nuestors spec files.
//Carpeta Support
Podemos escribir nuestros comandos especificos para usarlos luego.
//Cypress.config.js
Este archivo brinda acceso globalmente a todos el framework
Dentro de ese Archivo, podemos escribir los comandos que estan
dentro de la interfaz de cypress-->Project Settings
Si queremos cambiar la carpeta donde se guardan las screenshots
llamamos a esa screenshotFolder y le reasignamos un path.



*/
//test suite
describe("My Second test suite", () => {
  //test case
    it("Visiting the website", () => {
      //test step
      cy.visit("mercadolibre.com.uy");
      expect()
    })
    it("Creating an account", () => {
      //test step
      cy.visit("mercadolibre.com.uy");
      expect()
    })
})