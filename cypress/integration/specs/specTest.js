"use stric"
/// <reference types="Cypress" />
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

Luego correr el codigo en terminal para abrir interfaz
npm run cypress:open

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

-----------------AUTO-SUGERENCIA CYPRESS------------------------------------------
/// <reference types="Cypress" />
Esto se debe colocar arriba del todo en cypress y activa la sugerencia automatica

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

--------------SELECTORES------------------------------------------------------
Click derecho sobre la web xra abrir consola->Inspect->Element
Seleccionando la flechita arriba a la izq. de la consola.

CYPRESS ES COMPATIBLE SOLO CON CSS SELECTOR
Se puede importar XPAth
    CSS selectos se escriben 
    para id ->      #idname
        Si hay muchos id con el mismo nombre -> tagname#idname 
        // TAGNAME ES EL P, DIV, A, ETC...
    para clases ->  .classname
        Si hay muchas clases con el mismo nombre -> tagname.classname
          // TAGNAME ES EL P, DIV, A, ETC...
    para atributos -> tagname[attribute=value]
          //Atributos son: type, placeholder, los que estan en naranga en DOM.
          ej; input es tagname, type es attribute, "search" es value. -> input[type="search"];
    para movernos mediante tagnames, de padre a hijo
          //Debemos mirar el DOM como esta formado, si form tiene a input puedo hacer: form input
          //En xpath puedo hacer form/input
        
    para seleccionar elementos SOLO visibles
          //cy.get(".clasname:visible") -> sino tambien seleccinoa los ocultos


---------METODO GET-----------------------------------------------------------------------------------
Nos traer el objeto de la pagina web.

---------------------Assersions---------------------------------------------------------------
https://docs.cypress.io/guides/references/assertions#Length
.should("have.length", 40); -> deberia tener un largo de 40

----------------------  METODO WAIT-------------------------------------------------------------
Si queremos hacer que cypress espere un tiempo hay un metodo llamdo
cy.wait(1000) -> 1 segundo.
*/
//test suite
describe("My Second test suite", () => {
  //test case
  it.skip("Visiting the website", () => {
      //test step
      cy.visit("https://www.amazon.com/");
    })
  it.skip("Login", () => {
      //test step
      cy.visit("https://www.amazon.com/");
      cy.get("#nav-link-accountList > span > span").click()
      cy.get("#createAccountSubmit").click();
      cy.get("#ap_customer_name").type("Pablotest");
      cy.get("#ap_password").type("test2024");
      cy.get("#ap_password_check").type("test2024");
      cy.get("#ap_email").type("pablolarnaudiedrive2@gmail.com");
      cy.get("#continue").click();
  })
  it.skip(`Verifing code`, ()=>{
  /*con gmail
    cy.visit('https://mail.google.com')
    cy.get("#identifierId").type("pablolarnaudiedrive2@gmail.com")
    cy.get("#identifierNext > div > button > span").click();
    cy.get(".WpHeLc").click();
    setTimeout(()=>{
    cy.get("#identifierId").type("pablolarnaudiedrive2@gmail.com")
    cy.get("#identifierNext > div > button > span").click();
    cy.get(".WpHeLc").click();
    },4000);
    cy.get("#identifierId").type("pablolarnaudiedrive2@gmail.com")
    cy.get("#identifierNext > div > button > span").click();
    cy.get(".WpHeLc").click();
    cy.get("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input").type("t108216Y");
    cy.get("#passwordNext > div > button > span").click();
    */
   /*con microsoft
       cy.visit("https://www.microsoft.com/es-uy/");
    cy.get("#meControl").click();

    /*cy.get("#i0116").type("eltito_sabe@hotmail.com");
    cy.get("#idSIButton9").click();
    cy.get("#i0118").type("melacomo");
    cy.get("#declineButton").click();*/
  })
  it.skip("Searching items on Amazon", ()=>{
    //Going into Amazon
    cy.visit("https://www.amazon.com/");
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //verifiaing that should have 31 items.
    cy.get("[data-asin]").should("have.length",31)
  })
  it("Adding items to a chart", ()=>{
    //Going into Amazon
    cy.visit("https://www.amazon.com/");
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //verifiaing that should have 31 items.
    cy.wait(3000) //-> will wait for 3 seconds.
    cy.get("[data-asin]").should("have.length",31)
    //seleccionar ahora los ocultos (comentar linea arriba)
    //cy.get("[data-asin]").should("have.length",31)
    //Selecting one item from this array
    cy.get("[data-asin]").find(".a-size-medium a-color-base a-text-normal").eq(2).click();
  })
})