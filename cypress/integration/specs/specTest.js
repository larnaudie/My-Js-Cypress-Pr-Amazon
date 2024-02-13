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

---------------------Assersions---------------------------------------------------------------
https://docs.cypress.io/guides/references/assertions#Length
.should("have.length", 40);
     Verifica si deberia tener un largo de 40
.shoult(`exist`) or .should(`not.exist`)
    Verifica si un elemento existe en el DOM.

Verificar si un texto contiene una palabra:
Opcion 1)
  cy.get('#miElemento').should('contain', 'ejemplo');
Opcion 2)
  cy.get('#miElemento').invoke('text').then(texto => {
  expect(texto).to.include('ejemplo');
});

---------------------------CONDICIONALES-----------------------------------------------------
// Los comandos de Cypress son asincrónicos y no puedes usarlos 
// directamente en una declaración if de JavaScript de la misma 
// manera que lo harías con una función síncrona. 

Ej:
cy.visit("https://www.amazon.com/");
cy.get('#nav-search').then($elemento => {
  if ($elemento.length > 0) {
    // Si el elemento existe, hacer clic en él (o realizar otras acciones)
    cy.get('#nav-search').click();
  } else {
    // Si el elemento no existe, recargar la página
    cy.reload();
  }
});

//-----------------------METODOS---------------------------------//

-----------------------METODO GET-----------------------------------------------------------------------------------
Nos traer el objeto de la pagina web.

----------------------  METODO WAIT-------------------------------------------------------------
Si queremos hacer que cypress espere un tiempo hay un metodo llamdo
cy.wait(1000) -> 1 segundo.

------------------------mMETODO EQ---------------------------------
Selecciona un elemento de un array escribiendo el numero de indice
Ej;
  cy.get("[data-asin]").find(".puis-card-container").eq(2).click();

----------------------METODO CONTAINS------------------------------
Sirve para verificar si contiene un texto y devuelve valor booleano 


----------------------METODO RETROCEDER----------------------------
Con esto puedo retroceder una pagina hacia atras
    cy.go(`back`); 
    
----------------------  METODO REFRESCAR F5-------------------------
Con esto puedo refrescar toda la pagina.
    cy.reload

---------------------- METODO INVOKE -------------------------------
Con este elemento puedo extraer el texto de un elemento
    .invoke(`text`)
    
-----------------------  METODO .EACH -------------------------------
Con este metodo puedo iterar en un array, el valor de iteracion
sera igual al valor de largo de mi array, si tengo 5 elementos en el array
el bloque .each{} se ejecutará 5 veces.

El metodo cuenta con 3 elementos $el, index, $list.
$el -> Es el elemento que recorre y lo guarda ahi por cada loop
index -> Será igual al valor del indice que se encuentra el loop
$list -> Es la lista total de elementos.




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

      cy.get('#nav-search').should(`exist`).then(()=> {
      // Si el elemento existe, hacer clic en él (o realizar otras acciones)
      //typing in the search bar google pixel 8
       cy.get("#twotabsearchtextbox").type("Google Pixel 8")
      //doing click on the search button
      cy.get('#nav-search-submit-button').click();
      })
      cy.reload();

    //verifiaing that should have 31 items.
    cy.wait(3000) //-> will wait for 3 seconds.
    cy.get("[data-asin]").should("have.length",31)
    //seleccionar ahora los ocultos (comentar linea arriba)
    //cy.get("[data-asin]").should("have.length",31)
    //Selecting one item from this array
    cy.get("[data-asin]").find(".puis-card-container").eq(2).find(`.a-size-medium`).click();
    cy.get('#title > #productTitle').contains(`obsidiana`);
    cy.go(`back`);

    //Obtengo el objeto a iterar.
    cy.get("[data-asin]").find(".a-size-medium:visible").each(($el, lndex, $list) => {
      const text = cy.wrap($el).invoke(`text`)
      const celphones = [];
      text.should(`contain`,`128`).try(()=>{
        //Quiero que ingreses al elemento
        //Para ingresar al elemento tengo que envolverlo wrap
        cy.wrap($el).then($elemento => {
          try {
            // Realizar una aserción
            expect($elemento).to.exist;
            expect($elemento).to.be.visible;
            cy.wrap($el).click();
            // Si llegamos aquí, las aserciones fueron exitosas
            // Puedes continuar con el código que deseas ejecutar después de la verificación
            // ...
            
            //Extraigas el numero del precio.
            cy.get(`#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole:visible`)
            .invoke(`text`)
             //Lo guardes en la variable celphones
             //Para ello, debemos manejarlo fuera de javascript
             .then(priceText=>{
             celphones.push(priceText)
        
             // Imprimir en la consola de Cypress
             cy.log(`Precio: ${priceText}`);

             // Imprimir en la consola del navegador
             console.log(`Precio: ${priceText}`);
        cy.go(`back`)
       })} catch (error) {
            // Capturar el error en caso de que las aserciones fallen
            // Imprimir el error en la consola
            cy.log(`Error: ${error.message}`);
            
            // Continuar con el código, por ejemplo, imprimir en la consola que la aserción falló
            cy.log('La aserción falló, pero continuamos con el código...');
          }
        }); //esta condicional recorrera el array celphones y guardara el mejor precio.
      }).catch(err=>{
        
            // Imprimir el error en la consola
            cy.log(`Error: ${err.message}`);
            
            // Continuar con el código, por ejemplo, imprimir en la consola que la aserción falló
            cy.log('La aserción falló, pero continuamos con el código...');
      })
    })
  })
})