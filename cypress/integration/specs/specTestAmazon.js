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

//////////////////////////////////    EJECUTAR CYPRESS    ///////////////////////////////////////////


//Para ejecutar todos los archivos spec en la carpeta package.json
./node_modules/.bin/cypress run


-//////////////////////      AUTO-SUGERENCIA CYPRESS    ////////////////////////////////////////////


/// <reference types="Cypress" />
Esto se debe colocar arriba del todo en cypress y activa la sugerencia automatica



//////////////////////////////    cARPETAS Y SUS FUNCIONES   ////////////////////////////////////////////


                         -------    Carpeta fixtures -------------

Aca va a venir todos los datos que sean leidos de externos, como API JSONS, EXCEL
Podemos invocar los datos almacenados en fixtures con el comando: fixtures

Por ejemplo, si vamos a usar datos para loguearnos, lo vamos a guardar en la carpeta
fixtures como un objeto en el archivo examples.json.

{
  name: "Pablo",
  lastname: "Larnaudie",
  gender: "Male"
}

Una vez configurados estos datos, los invocamos en el spec archivo con cy.fixtures()
Tendremos que pasar el path, automaticamente cypress va a tomar el camino del archivo examples.json
  asique no vamos a indicarle el path.
El parametro que pondremos sera el nombre del json, y esto ES UNA PROMESA, asique debera tener esta estructura

  cy.fixture(`example`).then((data)=>{
    this.data=data
  })

Ahora lo que tenemos que hacer es pasarle ese parametro del objeto data, representado como this.data, a la
data global para que puedamos manipular esos datos en todo el framework.
//USAR IT CON FUNCTION(){})!!!!!!!

cy.fixture(`example`).then((data)){
  this.data=data
}
IT("",FUNCTION(){ });

luego podemos llamarlo en el get, mas abajo asi:
cy.get(`.claseSelectorName).type(this.data.name)


                         -------    Carpeta integration  -------------

Ahi vamos a colocar todos nuestors spec files.



                         -------    Carpeta Support -------------


Podemos escribir nuestros comandos especificos para usarlos luego
Podemos guardar en la carpeta support/commands.js conjuntos de lineas de codigo,
para luego copiar y pegar todo este codigo., darle un nombre decomando y llamarlo con 
tan solo un nombre.
Entonces, le colcoamos un nombre de comando, luego los parametros que deberiamos colocar manualmente
La sintaxis para declarar un comando en Cypress es:

Cypress.Commands.add('poneElNombreDelComando ', (parametrosQuePonemos) => { PONE TU CODIGO })

Luego lo llamaremos con cy.poneElNombreDelComando(parametrosQuePonemos);

Si tenemos estas lineas de comando por ejemplo:

*****************************************************************************

//Here I obtain 24 pieces of content, each should iterate by each element
cy.get("[data-asin]").find('h2.a-size-mini').each(($el, index, $list) => {
        
//Remember, this can't be handeld by cypress itself
const textTitle = $el.text();
//this directly won't work
//cy.get($el).find(`a.a-link-normal`);
//$el.text();

//Veryfing in console the value of the $el
cy.log(textTitle);
//Adding some logic to select ONLY the items with the following string
if(textTitle.includes(`Google Pixel 8`)){
  //this avoid the error triggered bu the click method.
  cy.once('uncaught:exception', () => false);
  //Applying the THEN method to handle the variable out of cypress.
  cy.get($el).find(`a.a-link-normal`).then((btn)=>{
  //this avoid the error triggered by the click method.
  cy.once('uncaught:exception', () => false);
  //remember we need to wrap $el or btn parameter to do click on it,
  cy.wrap(btn).click();
  });
  //Adding items to a chart
  cy.get('#add-to-cart-button').click();
  //Finding green icon
  cy.get('#NATC_SMART_WAGON_CONF_MSG_SUCCESS > .a-box > .a-box-inner > .a-icon').should(`be.visible`);
  //Verifying also with the string
  cy.get('.a-size-medium-plus').should(`contain`, `Agregado al carrito`)
  //Going back to be able to repeat all the loop again.
  cy.go(`back`);
  //this avoid the error triggered bu the click method.
  cy.once('uncaught:exception', () => false);
  cy.wait(2000);
  cy.go(`back`);
  //Verifying that we are correcltly in the main menu
  cy.get('.s-no-outline > .a-row > .a-size-base').should(`be.visible`);
  //this avoid the error triggered bu the click method.
  cy.once('uncaught:exception', () => false);
}else{
  cy.log(`There weren't matched strings, ${textTitle}`)
  }
})
*****************************************************************************

queda en support/commands.js

Cypress.Commands.add('selectProduct', (strTitle) => { codigo anterior pegado aca }


                   -------    Archivo Cypress.config.js -------------

Este archivo brinda acceso globalmente a todos el framework
Dentro de ese Archivo, podemos escribir los comandos que estan
dentro de la interfaz de cypress-->Project Settings
Si queremos cambiar la carpeta donde se guardan las screenshots
llamamos a esa screenshotFolder y le reasignamos un path.


//////////////////////////////////// Page object Design ///////////////////////////////////////////

                         -------    Carpeta Page Object Model -------------

1) Esta carpeta la crearemos nosotros a mano ubicada dentro de la carpeta de integration, al lado de la carpeta specs., y sera la que utilicemos para almacenar los selectores de
cada pagina html, a esto se le conoce como POM, Page Object Model.

Cada vez que nuestra web se recargue entera, significa que estamos en una pagina nueva, esa pagina nueva,
 tendra sus propios selectores, entonces esa pagina tendrá su clase de Page Object Model.
Generalmente cambia el endopoint, por cada endpoint tenemos una clase con los selectores de esa pagina..

2) Vamos a colocarle el nombre del archivo .js como el endpoint o algo que identifique que pagina es.

3) dentro del archivo .js, creamos una clase con el nombre del .js
Ejemplo:

class HomePage {
}

4) En la parte inferior, para hacer accessible globalmente e todo el framework el .js debemos escribir:
export default Homepage;

5) En el archivo spec, vamos a tener que importar este archivo, por ende en la parte superior debemos escribir:

import HomePage from '../pageObjects/HomePage.js';

Comentario: con ../ retrocedemos un lugar en la carpeta.
            con ../../ retrocedemos dos lugares en la carpeta.

6) Alli, dentro de HomePage class, vamos a colocarle todos los selectores de la pagina.
  Tenemos que colocarle el nombre al metodo que sea facilmente reconocible con el evento asociado.
  Luego lo que va a retornar será el selector.

class HomePage {

  //selector del campo de busqueda.
  searchBar() {
    return cy.get('#twotabsearchtextbox');
  }

  //selector del boton submit
  btnSubmit() {
    return cy.get(`#nav-search-submit-button`)
  }
}

7) Debemos ahora ir a nuestro archivo spec y alli debemos crear un objeto HomePage.
    Tuvimos que importarlo, pero solo con eso no es suficiente.
    Ahora tenemos que crear un objeto HomePage con la palabra New, debajo del it bloque.

  it("Testing on Amazon", function () {

      //Esto creara un nuevo objeto de HomePage y lo almacenara y guardara
      //para llamar a sus metodos con homepage.
      const homePage = new HomePage();
    ))
  
8) Para invocar a sus metodos, debemos acceder al objeto primero.

it("Testing on Amazon", function () {
    const homePage = new HomePage();

    homePage.searchBar().type(this.data.searchPhone[0]);
    homePage.btnSubmit().click();
  
  ));


/////////////////////////////////////    SELECTORES   /////////////////////////////////////////////////


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
    
    PARA VIAJAR DE PARENT TO CHILD, de PADRE A HIJO en el selector DEBO DEJAR UN ESPACIO.
          EJ; .ui-menu-item-wrapper div



///////////////////////////////////////   Assersions   /////////////////////////////////////////////////////
https://docs.cypress.io/guides/references/assertions


---------------------------------------------- METODO SHOULD---------------------------------
Syntax;
.should(chainers)
.should(chainers, value)
.should(chainers, method, value)
.should(callbackFn)

chainers(String)
Cualquier cadena válida que provenga de Chai o Chai-jQuery o Sinon-Chai.
Chai -> https://docs.cypress.io/guides/references/assertions#Chai
Chai-JQuery -> https://docs.cypress.io/guides/references/assertions#Chai-jQuery
Sinon-Chai -> https://docs.cypress.io/guides/references/assertions#Sinon-Chai

value(String)
Valor a hacer valer contra el encadenador.

method(String)
Un método que se llamará en el encadenador.

callbackFn(Function)
Pase una función que pueda tener cualquier cantidad de afirmaciones explícitas dentro de ella.
Lo que se pasó a la función es lo que se obtiene.

https://docs.cypress.io/guides/references/assertions#Length
*** .should("have.length", 40);
     Verifica si deberia tener un largo de 40

El should(`have.`) son Chai-Jquery y puede ir seguido de:
    have.a // have.attr // have.text // have.name // have.value // have.length // have.css //
    have.class // have.id // have.be.checked // have.be.visible // have.be.disabled // have.be.readonly
    have.be.focused // have.be.hidden // have.be.enabled // have.be.selected // have.be.focused//
    have.    


*** .shoult(`exist`) or .should(`not.exist`)
    Verifica si un elemento existe en el DOM.

*** Verificar si un texto contiene una palabra:
    Opcion 1)
      cy.get('#miElemento').should('contain', 'ejemplo');
    Opcion 2)
      cy.get('#miElemento').invoke('text').then(texto => {
       expect(texto).to.include('ejemplo');
});

*** Verificar si un checkbox ha sido seleccionado correctamente
    //Selecting Google checkbox
    cy.get(`#p_89\/Google > span > a > div > label > i`).check().should(`be.checked`);

*** Verificar si tiene exactamente el texto impreso en pantalla
    .should(`have.text`,`texto`);

    //Si Cypress te dice al usar have.text obtiene un texto con caracteres como /n o \n, usemos include
    //con include solamente nos asesoramos de que contenga una parte del texto y no todo por que da error.

*** Hacer varios should juntos no... USAR METODO AND

                                              --METODO SHOULD con AND-
*** Si quisieramos validar mas de una cosa a la vez podemos usar el .and, por ejemplo si tiene un valor o algo.

  //Going to the checkbox
    cy.get('#gift-wrap').check().should(`be.checked`).and(`have.value`,`nameOfValue`);

*** Si quisieramos verificar si esta deschequeado podemos usar el should de esta forma y combinar con .uncheck()
.should(`not.be.checked`)

**** Si queremos ver si algo es visible o no, podemos usar 
.should(`be.visible`)
.should(`not.be.visible`)


//////////////////////////////////////   ASYNCRONISMO   ///////////////////////////////////////////////////////////

CYPRESS ES ASYNCRONICO, si son comandos de cypress, todos los comandos llegaran al servidor a la misma vez
Las promesas no son mas que un paso, y devuelve 3 resultados.
Pending, resuloved, rejected -> La promesa puede estar pendiente, resuelta o rechazada

                         -METODO THEN-
Sirve para manejar asyncronicamente cypress, cuando una respusta
va a demorar o una accion tiene que ser hecha fuera del framework
debemos esperara a que la promesa se cumpla en then, y sino, catch
atrapa el error.

  cy.get('#miElemento').invoke('text').then(texto => {
  expect(texto).to.include('ejemplo');
});

Podemos tener muchos .then seguidos unos de otros.

Ejemplo:
Si queremos obtener el texto del logo de amazon, asi no se puede hacer;
    const logo = cy.get("#nav-logo-sprites");
    logo.text()

Debemos tratarlo como una promesa.
    cy.get("#nav-logo-sprites").then((logo)=>{
      El elemento obtenido del selector, se almacenara en el parametro logo.
    cy.log(logo.text());
    })

Si concatenamos un comando de cypress con otro, por ejemplo;
cy.get(".algo").type(".algoMas")
Lo resolverá internamente-
NO PODEMOS CONCATENAR CYPRESS COMAND CON JAVASCRIPT COMAND, PARA ESO HAY QUE USAR THEN.


///////////////////////////////////   METODOS    ////////////////////////////////////////////////////
https://docs.cypress.io/api/table-of-contents


-----------------------------METODO CLICK--------------------------------------------------
Luego de un cy.get, podemos hacer un .click()

Si este click esta dentro de un .each, tendremos que usar cy.wrap.


-----------------------------METODO type --------------------------------------------------
Te sirve para seleccionar un elemento y escribir alli

cy.get(`.field`).type("Holaaaa");

-----------------------------METODO clear--------------------------------------------------
Te sirve para limpiar el campo.

cy.get(`.field`).clear()


----------------------------  METODO GET-----------------------------------------------------------------------------------
Nos traer el objeto de la pagina web.



-----------------------------  METODO WAIT-------------------------------------------------------------
Si queremos hacer que cypress espere un tiempo hay un metodo llamdo
cy.wait(1000) -> 1 segundo.


----------------------------    METODO EQ---------------------------------
Selecciona un elemento de un array escribiendo el numero de indice
Ej;
  cy.get("[data-asin]").find(".puis-card-container").eq(2).click();



----------------------------   METODO CONTAINS------------------------------
Sirve para verificar si contiene un texto y devuelve valor booleano 



-----------------------------  METODO RETROCEDER----------------------------
Con esto puedo retroceder una pagina hacia atras
    cy.go(`back`); 
    
    
------------------------------  METODO REFRESCAR F5-------------------------
Con esto puedo refrescar toda la pagina.
    cy.reload


---------------------------------- METODO INVOKE JQ -------------------------------
Es una metodo de Jquery no de cypress.
Invoke lo que hace es invocar una funcion, puede tener dos parametros, un parametro invocando a la funcion
JQuery y el segundo parametro dandole un valor a esa funcion invocada.
Con este elemento puedo extraer el texto de un elemento

    .invoke(`text`)
Tambien puedo eliminar atributos del DOM

.invoke(`removeAttr`,`target`)

------------------------------------  METODO .EACH -------------------------------

Con este metodo puedo iterar en un array, el valor de iteracion
sera igual al valor de largo de mi array, si tengo 5 elementos en el array
el bloque .each{} se ejecutará 5 veces.

El metodo cuenta con 3 elementos $el, index, $list.
$el -> Es el elemento que recorre y lo guarda ahi por cada loop
index -> Será igual al valor del indice que se encuentra el loop
$list -> Es la lista total de elementos.

ESTRUCTURA DEL EACH;
.each(($el, index, $list) => {})

.each lo que hará sera: Tomar el elemento encontrado y lo alamcenara en $el
por ejemplo: 

cy.get("[data-asin]").find('h2.a-size-mini').each(($el, index, $list) => {})

Ahi, en h2.a-size-mini, tengo 24 elementos, sobre ellos es que va a iterar .each.
SI quisiera que busque un elemento cada vez que este adentro de ese elemento, podemos decirle

cy.get("[data-asin]").find('h2.a-size-mini').each(($el, index, $list) => {
  cy.wrap($el).find(`.elElemento`)
})


------------------------------ METODO INCLUDES JQ  -----------------------------------
INCLUDES es un metodo de Javascript.

Si queremos extraer un texto, sabemos que .text no es comando de cypress, sino de Javascript
Si queremos decir si el texto incluye un caracter, debemos usar .includes, pero sobre el texto.

**********SE DEBE USAR ENTONCES LA PALABRA .THEN para obtener el elemento, extraer su string, almacenarlo y 
**********verificar con .includes si incluye un caracter.

get(`.alert`).then((element)=>{
  const text = element.text();
  if(text.includes(`text`)){
    cy.wrap(element).click();
  }
})

*********COMO ALTERNATVA PODEMOS USAR EL EXPECT DE CHAI

get(`.alert`).then((element)=>{

  const text = element.text();
  expect(text.include(`Success`)).to.be.true;
})

------------------  METODO TEXT NO ES UN COMANDO DE CYPRESS JQ  --------------------------

Sirve para extraer el texto de un elemento, podemos guardarla en una variable para sarla.
AL NO SER COMANDO DE CYPRESS SE DEBE MANEJAR COMO PROMESA.

EJEMPLO:
cy.get(".products").as("productLocator");
    cy.get("@productLocator")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          cy.wrap($el).find("button").click();
        }
      });

-------------------------------  METODO INVOKE  JQ  --------------------------------------------

INVOKE SIRVE PARA EJECUTAR FUNCIONES JQUERY, por ejemplo, si quiero llamar a un comando que me imprima el texto debo
escribir texto = cy.get('#miElemento').invoke('text');

Sirve para extraer el texto de un elemento.

  cy.get('#miElemento').invoke('text').then(texto => {
  expect(texto).to.include('ejemplo');

});
                          --- MEOTODO INVOKE  -> HOVER con SHOW JQ----
                          https://docs.cypress.io/api/commands/invoke

Si quiero que me muestre un objeto invisible, como un dropdown, funciona como hover.
Lo que hara sera mostrarme todos los metodos ocultos.

debo colocar: cy.get('#miElemento').invoke('show');

SE VA A APLICAR A LOS HIJOS inmediatos DE ESE ELEMENTO.

Mouse hover, no esta soportado por cypress, podemos manejarlo con Jquery
utilizando el show method QUE ESTA DENTRO DE INVOKE

PARA CORRER COMANDOS DE JQUERY debemos usar invoke


------------------------------  METODO CHECK  --------------------------------------

**** Debemos obtener el selector del checkbox y sobre el le aplicamos el metodo check()

    //Selecting Google checkbox
    cy.get(`#p_89\/Google > span > a > div > label > i`).check();

**** Cuando un elemtno esta siendo solapado por otro, podemos usar 
.check({force: true})


**** Chequear multiple checkboxes, para ello debemos verficar en inspeccionar elemento
que tengan el mismo valor en comun, luego en check() le pasamos los valores que queremos
que esten chequeados:

Ejemplo:
cy.get(`input[type=`checkbox`]`).check([`option2`,`option1`])


------------------------------  METODO UNCHECK  --------------------------------------

//Selecting Google checkbox
    cy.get(`#p_89\/Google > span > a > div > label > i`).uncheck();


------------------------------  METODO AS  -------------------------------------------

En vez de guardar todo un selector con un const o let, podemos y DEBEMOS usar as,
luego para llamarlo lo arrobamos antes del nombre que le dimos


-----------------------------       METODO SELECT   --------------------------------

Simplemente tenemos que escribir dentro de select el valor que va a contenter, 
es decir el texto que tiene dentro
NO ADMITE OTRO QUE NO SEA

Si tengo en el DOM_
  <select id="searchDropdownBox" name="searchDropdownBox">
    <option value="search-alias=alexa-skills">All Categories</option>
    <option value="search-alias=alexa-skills">Alexa Skills</option>
  </select>

Alli con decirle asi, lo estaremos sleeccionando:
cy.get(`select`).select(`Alexa Skills`)



-----------------------------       METODO PAUSE   --------------------------------

Este metodo nos permite poner pausa en un punto del codigo para poder debagguear, inspeccionar el codigo
hasta un punto.
https://docs.cypress.io/api/commands/pause

cy.pause();

Podemos continuar nuestra ejecucion, dandole click al boton resume en cypress, o 
Si quiero hacer que corra el siguiente comando y se ponga en pausa de nuevo puedo hacer click en el icono
>| 

Next: 'click

Tambien tenemos la palabra reservada .debug(), para hacer un breakpoint, pero hace lo mismo que pause


//////////////////////////////////////     DROPDOWNS PIQUES     //////////////////////////////////////////////////////////


------------------------------    Static Dropdown       ------------



------------------------------    Dynamic Dropdown       -----------------------------------
Cuando vamos a ver un Dropdown Dinamico y se nos esconde la barra para poner insepccionar, vamos a darle click izquierdo
antes de que cierre el dropdown y le daremos en inspect, entonces eso nos llevara al DOM del dropdown

Si no supiera cual dropdown tiene el texto que me sirve, podesmo hacer un selector generico.
En el Dom tengo esto:

<ul id="ui-id-1" tabindex="0" class="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front">
  <li class = "ui-menu-item"> </li>>
    <div id="ui-id-2" tabindex="-1" class="ui-menu-item-wrapper">  British indian Ocean Territory </div>
  <li class = "ui-menu-item"> </li>>
    <div id="ui-id-2" tabindex="-1" class="ui-menu-item-wrapper"> India  </div>
  <li class = "ui-menu-item"> </li>>
    <div id="ui-id-2" tabindex="-1" class="ui-menu-item-wrapper"> Indonesia </div>
</ul>

Para que se seleccionen los elementos, debo interactuar en la ui con el dropdown para que sean visibles.
Alli queremos ver cual tiene india y seleccionar ese.
PARA VIAJAR DE PARENT TO CHILD, de PADRE A HIJO en el selector DEBO DEJAR UN ESPACIO.
EJ; .ui-menu-item-wrapper div

Alli podemos usar el metodo .each para iterar entre esos 3 elementos, en cada index hacemos un if
Recordar que $el es JQuery

cy.get(`#autocomplete`).type("ind");
cy.get(`.ui-menu-item-wrapper div`).each(($el, index, $list) => {
  if ($el.text() === "India") {
    $el.click();
  }
})


//////////////////////////////////  JQUERY IN CYPRESS  ////////////////////////////////////////////

-------------------------- JQ METODO FOREACH ----------------------------------

Para iterar sobre un array en javascript podemos usar forEach, que lo que hace sera recorrer
 cada elemento del array.

const myArray = [1, 2, 3, 4, 5];

myArray.forEach((element) => {
  console.log(element);
})

Esto va a imprimir 1, 2, 3, 4 y 5.
Esto de aca abajo va a escribir cada elemento del array y luego limpiarlo.

myArray.forEach((phone)=>{
  cy.get('#twotabsearchtextbox').clear();
  cy.searchProduct(phone)
})

---------------------JQUERY METHOD: TEXT----------------------------------
TEXT es un metodo que esta dentro de Jquery en Cypress, soporta jquery metods, y text es un metodo de jquery.
No hay un metodo que grabe el texto en cypress.
JQueary es una herramienta de desarrollo disponible para manipular el DOM.

 //////////////////////////////////////         HOOKS          //////////////////////////////////////////

 before(() => {
 })
 after(() => {
 })
 beforeEach(() => {
 })
 afterEach(() => {
 })

Esos son los hooks, todo lo que se encuentre en ese bloquye ocurrira antes, despues, antes de cada it block,
y despues de cada it block.
Sirve para eliminar catche, o cerrar el browser.

////////////////////////////////////////////       ALERT         /////////////////////////////////////////////////////////

Si queremos verificar alertas cypress tambien tiene un metodo .alert()
SI queremos verificar el texto de la alerta debemos manejarlo con un evento, window:alert.
eso es algo relacionado con el browser no con cypress.

Las alertas no necesariamente necesitan ser llamadas con .alert()
Las alertas suceden con un .click() en algun elemento.

        ----------  window:alert  ----------

cy.on(`window:alert`, (text) => {
})

Cy.on, lo que hace es:
Primer parametro, captura el evento, window:alert es uno de ellos.
Segundo parametro, captura la respusta en un string y sobre ella podemos hacer algo
    Aqui es donde empieza a esperar que se cumpla la promesa.

Usaremos MOCHA ACA,
¿COMO COMPARAR DOS STRINGS EN MOCHA'
expect(`text`).to.equal(`text`)

cy.on(`window:alert`, (text) => {
  expect(`text`).to.equal(`text`)
})

        ----------  window:confirm  ----------

Otro evento es confirm, que aparece igual que alert pero es de confirmacion.

//////////////////////////////////////            CAMBIAR DE VENTANA        ////////////////////////////////////////

Cuando estamos trabajando y se abre una ventana en paralelo, una ventana hija, la vamos a manejar asi:
En cypress NO SE PUEDE CAMBIAR A LA VENTANA HIJA, CHILD WINDOW.
Hay un workaround, pero NO RESUELVE EL PROBLEMA DEL TODO.

TIP;
Tendremos que hacer que la aplicacion cargue a la pagina hija, como la pagina actual, en vez de que
lo abra en una pestaña separada.
Hay un atributo llamado target, dentro de la etiqueta a, que tiene valor; _blank, _self, _parent, _top, o una URL
que tiene la accion de abrir en una pestaña nueva esa pagina.

Lo que podemos hacer acá es utilizar cypress con JQuery para remover el atribute target e invocar el DOM nuevamente
Ésto lo que hara al ser removida y ser cliqueada, será cargar la pagina en el mismo tab.

utilizaremos el metodo invoke, estamos invocando una funcion, la funcion que queremos en Jquery es removeAttr.
Como segundo parametro le pasaremos el atributo target que queremos eliminar.

cy.get(`.classWithTarget`).invoke(`removeAttr`, `target`).click()

Una vez que hayamos abierto la nueva pagina, para que no haya error de dominio cruzado debemos ejecutar todas las acciones
de la nueva ventana dentro de un comando llamado origin

cy.origin(`NEW URL`, ()=>{
  cy......
}

///////////////////////////////////         WEB TABLES          ////////////////////////////////////////////



///////////////////////////////////           IFRAME         ////////////////////////////////////////////


iFrame es un html metido en otro html, para poder manipular este tipo de cosas debemos utilizar un plugin llamado cypress-iframe
Debemos instalarlo estando parados en la direccion de carpeta en donde este el .node_modules.

npm install -D cypress-iframe

Luego debemos importar en la parte de arriba del todo del .js copiando y epgando estas lienas de codigo:
import 'cypress-iframe';

Si queremos que nos haga sugerencias sobre la utilizacion de iframe debemos copiar esta linea de codigo:
/// <reference types="Cypress-iframe" />

Vamos a utilizar esto cuando veamos una etiqueta en el DOM de iframe, si necesitamos interactuar con eso vamos a utilizar el plugin.
<iframe ...

Para activar el plugin debemos hacerlo con ---------------------------> cy.frameLoaded()
Luego debemos decirl que vamos a cambiar al modo iframe escirbiendo ---> cy.iframe()
Luego, vamos a colocar que queremos buscar el id, div, class... etc---->cy.ifram().find(`selector`)
Chropath no es capaz de encontrar los elementos dentro del iframe



////////////////////////////////         DEFAULT SETTINGS          ///////////////////////////////////////



Dentro de cypress, cuando hagamos heho npm run cypress:open y hayamos abierto el IDE de Cypress, hay un luagar en donde estan los
comanod seteados por defecot, por ejemplo, settimeout.
Ingresar a Cypress -> Settings -> Default Settings.
Alli veremos las configuraciones por defecto de cypress el setTimeout esta por defecto en 4000

defaultCommandTimeout: 4000 

Esa linea anterior, podemos copiarla y pegarla en cypress.config.js
y alli podemos pegar este comando para modificarlo globalmente y cambiar su valor.

const { defineConfig } = require("cypress");
module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:`cypress/integration/specs/*.js`,
  }
});

**PODEMOS SETEARLO PARA UN CASO PUNTUAL, debemos escribir en el spec, arriba de la linea que quiero modificar ese tiempo global.
Cypress.config('defaultCommandTimeout', 5000);



////////////////////////////////////     SUMANDO PRODUCOTS, RECORTAR PRODUCTOS          //////////////////////////////////////



////////////////////////////////////     VARIABLES, AMBIENTES, ENVIRONMENTS          //////////////////////////////////////

lAS VARIABLES SE USAN PARA ESTABLECE VALORES GLOBALMENTE Y APLICARLO A TODOS LOS CASOS DE PRUEBA EN EL FRAMEWORK.
Abrimos archivo cypress.config.js
  podemos configurar ahi un conjunto de variables de entorno o environments, para declararlas y reutilizar.
  Lo mas comun es configurar environments para URL.
  Por ejemplo; tenemos entornos de pruebas, entonro desarrollo, entorno aceptacion usaurio UAT, entorno produccion.
  
  Entorno de prodcuccion puede ser;
  https://rahulshettyacademy.com/angularpractice
  Entorno UAT:
  https://uatrahulshettyacademy.com/angularpractice
  Entorno de pruebas
  https://qarahulshettyacademy.com/angularpractice

El objetico del environment es facilitar el cambio de entorno de pruebas, pruebas, si tenemos que probar en
prod, qa, uat, etc, tenemos cada entorno guardado en un ambiente, entonces simplemente debemos correr las pruebas 
eligiendo el ambiente correcto.

¿COMO HACER?
Ir a Cypress IDE, settings -> Project Settings
Alli debemos buscar un env: {}, generalmente esta en blanco.
Vamos a llamarlo e invocarlo en el archivo cypress.config.js para configurar alli nuestros ambientes.

  En cypress.config.js, debemos escribir env: { }
------------------------------------------------------------
  const { defineConfig } = require("cypress");

  module.exports = defineConfig({
    //CONFIGURAMOS EL TIEMPO DE ESPERA GLOBAL DE la ide de CYPRESS DESDE VISUAL STUDIO CODE.
    defaultCommandTimeout: 5000,

   env: { 
    "elementoGlobal": "https://rahulshettyacademy.com/angularpractice/",
    //Podemos utilizarlo como un example.json pero de modo global y accediendo con cyprees.env(`userId`)
    "userId": "Pablolarnaudie",
    },

    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      specPattern:`cypress/integration/specs/*.js`,
    }
  });
--------------------------------------------------------------

Ahora, en el ENV, creamos un objeto Value:key con elnombre del ambiente y como valor el ambiente.
  
  env: { 
      url: 'https://rahulshettyacademy.com/angularpractice/',
    },

Ahora tendremosq ue llamar al ambiente en el it block, debemos hacerlo mediante la palabra Cypress.env(url)
En el archivo spec:

    cy.visit(Cypress.env(`url`));

Si la raiz es la misma pero cambia el final podemos concatenar los strings.
Si da error, cerrar Cypores IDE y abrirlo de nuevo.

    cy.visit(Cypress.env(`url`) + `/angularpractice/`)

Esta configuracion sirve para todo, no solo ambientes, podemos guardar userID tambien, es como un example.json, pero global.



/////////////////////////////////////////       CYPRESS PACKAGE.JSON         ////////////////////////////////////////////



Tambien podemos darle desde la terminal, decirle que corra el spec desde la terminal.
INDEPENDIENTEMENTE DEL CYPRESS.CONFIG.JS
NOTA; Si Cypress se instalo globamente no necesitamos npx, pero si estamos trabajdo con CI o CD, precisamos escribir npx.

  npx cypress run --spec “cypress/integration/specs/specTestAmazon.js” --env url=https://rahulshettyacademy.com/angularpractice

LA PARTE MAS IMPORTANTE ES ÉSTA: --env url=https://rahulshettyacademy.com/angularpractice
Ahi estamos indicando en que ambiente quiero correr las pruebas.
Si queremos crrerlo en moodo oculto, podemos escribir --headed antes del --env
Si queremos correrlo en un browser especiico podemos poner despues del header y antes del --env; --browser chrome.

//Para ejecutar un spec file especifico, despues del run colocar el nombre del spec que quiero.
//Revisar Resumen en Environments.
  npx cypress run --spec “cypress/integration/my-spec.js”

//SI EJECUTAMOS ASI CYPRESS SE EJECUTARA INVISIBLE

//SI queremos que se ejecute visible la interfaz, por defecto es --headless.
./node_modules/.bin/cypress run --header

//Si queremos ejecutarlo en chrome
cypress run --browser chrome

//Si quiero agregarle un ambiente puedo agregar luego del --header y --browser;

cypress run --header --env envName=envValue

//puedo crear nombres personales que alamcenen el valor del ambiente para llamarlo mas rapido.
//No preciso crear un ambiente en Cypress.config.js -> ENV. ESTO ES INDEPENDIENTE a Cypress.config.js.
//npx se usa cuando cypress no fue instalado globalmente, el envName tiene que estar en Cypress.config.js

scripts:{
  "cypress:open": "cypress open --env envName=envValue"
  "envQA": npx cypress run --spec “cypress/integration/my-spec.js” --env envName=envValue
}

Ahora podemos correr ese script solamente escribiendo npm run envQA.



////////////////////////////////////////        BDD CUCUMBRER         ////////////////////////////////////////////

https://www.browserstack.com/guide/cypress-cucumber-preprocessor
https://github.com/badeball/cypress-cucumber-preprocessor

---------------------------------------------      iNSTALACION             ---------------------------------------------

Por defecto Cypress no soporta comandos de cucumber.
Deberemos agregar el paquete a nuestro proyecto y podremos ejecutar nuestros test de cypress en cucumber.

npm install @badeball/cypress-cucumber-preprocessor

Ahora debemos darle la informacion al cypress.config que tenemos cucumber instalado.
setupNodeEvents, nos ayuda a cargar todos los plugins antes de iniciar la prueba, ahora nosotros
tenemos un plugin externo llamado cucumber, entonces, tenemos que darle ese detalle al setupNodeEvents.
¿Como hacerlo? seguiremos la documentacion y dice que debemos agregar estas dos lineas

Quitaron el setupNodeEvents de e2e para afuera como una funcion async
Luego lo llamaron adentro de e2e para que sea mas legible cuando tengamos muchos plugins.

En cypress.config.js quedaria;

*********************************************************
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
    specPattern:`cypress/integration/specs/*.js`,
  }
});
************************************************************

AHORA debemos ir al package.json, e importar el broserify
"@cypress/browserify-preprocessor": "lastest"

Una ultima cosa, dentreo de CYPRESS.CONFIG.JS en e2e, en el specPattern
nosotros tenemos alli los archivos specs, podemos crear otra carpeta llamda BDD y ahi colocar
los archivos de cucumber que son .feature.
Luego en CYPRESS.CONFIG, en specPattern ponemos el path de la carpeta BDD y la extension del archivo.

  e2e: {
    setupNodeEvents,
    //specPattern:`cypress/integration/specs/*.js`, <--------La comentamos para no perder lo de antes.
    specPattern:`cypress/integration/specs/BDD/*.feature`,
  }

Abrir Visual Studio Code y buscar una extension llamada "Cucumber (Gherkin) Full Support"

-----------------------------------------------------         BBD Syntax          -----------------------------------------------

Adentro de nuestra carpeta specs, vamos a crear una carpeta llamada BDD, alli crearemos un archivo .feature
por ejemplo:
amazon.feature

Vamos a ver que su icono, puede actualizarse al mismo que cucumber, depende del estilo de VIsual Studio Code.
Adentro de la carpeta BDD, vamos a crear otra carpeta CON EXACTAMENTE EL MISMO NOMBRE que le demos
al archivo .feature, si es amazon.feature, la carepta será amazon, para que luego busque y no se pierda en el
 camino, ahi en esa carpeta, crearemos un archivo .js. 
En ese archivo .js estara nuestro codigo automatizado, le podemos llamar amazonSteps.js
Cucumber, no usara los archivos que teniamos en specs, como specTestAmazon.js, sino los que estaran en la carpeta BDD.
Ahi vamos a despedazar nuestro codigo en partes relacionandolos con cada test case descripto en cucumber.

BBD Cucumber, usa una sintaxis para ordenar los test cases.
FEATURE, SCENARIO, GIVE, WHEN, AND, y termina con WHEN.
Permite manejar multiples test cases.

FEATURE: Precisa un Nombre y una descripcion.

        Explicacion de lo que va a estar haciendo nuestro archivo .feature
        Un feature, puede tener multiples scenarios, es como una suite con multiple test cases.

      SCENARIO: Nombre del Test Case.
Luego de scenario, entran en juego GIVEN, WHeN, THEN, THEN.

      GIVEN: Se ejecuta antes de cada test case.
      WHEN: Aca se dirá cual es el proximo paso que va a pasar.
      AND: Es una conexion para no repetir tanto el when
      THEN: es el resultado final, el objetivo de mi scenario.

Ahora tendremos que enlazar este .feature con nuestro .js, asi nuestro codigo y los pasos estan relacionados.
En la carpeta BDD tenemos los pasos en cucumber
Adentro de la carpeta BDD tenemos los archivos .feature y una carpeta nombarada igual que ese .feature 
Adentro de cada carpeta estaran los .js con los pasos a seguir descriptos en .feature.
Luego los vaoms a relacionar entre ellos.

ABRIMOS ARCHIVO amazonSteps.js

Lo primero que tenemos que ahcer es importar todo
import {GIVEN, THEN, WHEN, AND} from "cypress-cucumber-preprocessor/steps";

Ahora debemos empezar a escribir el paso y abajo el codigo que hace lo que describe el paso.
GIVEN("el titulo que le dieron a given", ()=>{
  el codigo que hace lo que describe el paso.
})

En la parte superior, debemos importar los pageobect model, las referencias de cypress, los given, then, when
y todo lo que estuviesemos necestiando para usar en el codigo, lo mismo que usamos en los specTestAmazon.js

------------------------------------------    HOOKS ON CUCUMBER   ---------------------------------------------

EN CUCUMBER TAMBIEN ESTAN LOS HOOKS, PODEMOS USAR BEFORE, BEFOREEACH AFTER Y AFTEREACH.

Si tenemos un hook, debemos crear un archivo .js con el nombre del hook, por ejemplo beforeEach.js y ahi colocar nuestro codigo.
Entonces, dentro de la carpeta BDD, dentro de la carpeta amazon (o lo que sea), pondremos el beforeEach.js





*/
"use strict"; 
/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe';
//ESTO ESTA ROMPIENDO TODO
import HomePage from '../pageObjects/HomePage.js';

//test suite
describe.skip("TESTING AMAZON WEBPAGE", () => {
  //test case
  beforeEach(() => {
    //Implementing commands on Support/commands.js folder, file.
    cy.switchLang(`ES`);
  })

  it.skip("PASS- Visiting the website", () => {
      //test step
      //Going into Amazon -> with before each hook
       // cy.visit("https://www.amazon.com/");
    })

  it.skip("FAIL- Login - IMPOSIBLE TO CHECK CODE", () => {
      //test step
      //Going into Amazon -> with before each hook
      cy.visit("https://www.amazon.com/");
      cy.get("#nav-link-accountList > span > span").click()
      cy.get("#createAccountSubmit").click();
      cy.get("#ap_customer_name").type("Pablotest");
      cy.get("#ap_password").type("test2024");
      cy.get("#ap_password_check").type("test2024");
      cy.get("#ap_email").type("pablolarnaudiedrive2@gmail.com");
      cy.get("#continue").click();
      cy.visit('https://accounts.google.com')
      cy.origin('https://accounts.google.com', ()=>{
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
        cy.get("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input").type("t******Y");
        cy.get("#passwordNext > div > button > span").click();
      })
  })

  it.skip(`FAIL- Verifing code to log-in - IMPOSIBLE TO ACCESS TO THE eMAIL`, ()=>{
    //WAS IMPOSIBLE TO ACCESS TO THE eMAIL TO VERYFY THE CODE.

  /*con gmail*/
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

   /*con microsoft
       cy.visit("https://www.microsoft.com/es-uy/");
    cy.get("#meControl").click();

    /*cy.get("#i0116").type("eltito_sabe@hotmail.com");
    cy.get("#idSIButton9").click();
    cy.get("#i0118").type("melacomo");
    cy.get("#declineButton").click();*/
  })

  it.skip("PASS- Testing the search bar", ()=>{
    //Going into Amazon -> with before each hook
       // cy.visit("https://www.amazon.com/");
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //verifiaing that should have 31 items.
    cy.get("[data-asin]").should("have.length",31)
  })

  it.skip("PASS- Catching the Amazon logo", ()=>{
    //Going into Amazon -> with before each hook
       //  cy.visit("https://www.amazon.com/");
    //Trying to get the Amazon logo. AND SAVING IT INTO A VARIABLE
    //This two lines, will trigger: logo is not a function, because cypress couldb't solve it without a promise
    //Cypress can't handle this get inside a variable.
    //const logo = cy.get("#nav-logo-sprites");
    //logo.text()

    cy.get("#nav-logo-sprites").then((logo)=>{
      //The element got from the selector, will be saved in logo parameter.
      //TEXT IS NOT A CYPRESS METHOD.
    cy.log(logo.text());
    })

  })

  it.skip("Rahul shetty - Example with about then promises",() => {
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
      cy.get(".search-keyword").type("ca");
      cy.wait(2000);
      //selenium get hit url in browser, cypress get acts like findElement of selenium
      cy.get(".product").should("have.length", 5);
      cy.get(".product:visible").should("have.length", 4);
      //Parent child chaining
      cy.get(".products").as("productLocator");
      cy.get("@productLocator").find(".product").should("have.length", 4);
      cy.get(":nth-child(3) > .product-action > button").click();
      cy.get("@productLocator")
        .find(".product")
        .eq(2)
        .contains("ADD TO CART")
        .click()
        .then(function () {
          console.log("sf");
        });
  
      cy.get("@productLocator")
        .find(".product")
        .each(($el, index, $list) => {
          const textVeg = $el.find("h4.product-name").text();
          if (textVeg.includes("Cashews")) {
            cy.wrap($el).find("button").click();
          }
        });
  
      //assert if logo text is correctly displayed
      cy.get(".brand").should("have.text", "GREENKART");
  
      //this is to print in logs
      cy.get(".brand").then(function (logoelement) {
        cy.log(logoelement.text());
      });

  })

  it.skip("PASS - Testing adding an item to a chart", ()=>{
    //Going into Amazon -> with before each hook
       //  cy.visit("https://www.amazon.com/");
      //will made a refreash to solve the problem of catch a different search bar
      cy.reload();
      //will serch for the search bar
      cy.get('#nav-search');
      //typing in the search bar google pixel 8
       cy.get("#twotabsearchtextbox").type("Google Pixel 8")
      //doing click on the search button
      cy.get('#nav-search-submit-button').click();

    //verifiaing that should have 31 items.
    cy.wait(3000) //-> will wait for 3 seconds.
    cy.get("[data-asin]").should("have.length",31)

    //Selecting one item from this array
    cy.get("[data-asin]").find(".puis-card-container").eq(2).find(`.a-size-medium`).click();
    //Selector to be able to see all the options -> add to cart button will be available
    cy.get('#add-to-cart-button').click();
    //We expect that the cart has a number 1 as a final count.
    cy.get('#nav-cart-count').should(`contain`,`1`);

    //Verifying that the cart truly has the item added
    cy.get('#sw-gtc > .a-button-inner > .a-button-text').should(`exist`).click();

    //Accessing to the title's string to verify if contains google pixel 8 string.
    cy.get('.a-truncate-cut').invoke(`text`).should(`contain`, `Google Pixel`)
  })

  it.skip("Fail - Testing adding some items to a chart", ()=>{
        //Going into Amazon -> with before each hook
       // cy.visit("https://www.amazon.com/");
        //will made a refreash to solve the problem of catch a different search bar
        cy.reload();
        //will serch for the search bar
        cy.get('#nav-search');
        //typing in the search bar google pixel 8
        cy.get("#twotabsearchtextbox").type("Google Pixel 8 - ")
        //this avoid the error triggered bu the click method.
        cy.once('uncaught:exception', () => false);
        //doing click on the search button
        cy.get('#nav-search-submit-button').click();
      
      //verifiaing that should have 31 items inside attribute data-asin indie .s-main
      cy.wait(3000) //-> will wait for 3 seconds.
      
      //variates between 41 and 42
      //cy.get(".s-main-slot").find(`[data-asin]`).should("have.length",41)
      
      //Here I obtain 24 pieces of content, each should iterate by each element
      //this code are beiing implemented in the support/commands.js -> addToCart
    const ignoredItems = [];
    let addedItems = [];

    cy.get("[data-asin]").find('h2.a-size-mini').each(($el, index, $list) => {
        
        //Remember, this can't be handeld by cypress itself
        const textTitle = $el.text();
        //this directly won't work
        //cy.get($el).find(`a.a-link-normal`);
        //$el.text();

        //Veryfing in console the value of the $el
        cy.log(textTitle);

        //Adding some logic to select ONLY the items with the following string
        if(textTitle.includes(strTitle) && addedItems.length <= 1){
            //this avoid the error triggered bu the click method.
            //cy.once('uncaught:exception', () => false);

            //Applying the THEN method to handle the variable out of cypress.
            cy.get(`h2 a[class*="a-link-normal s-underline-text"]`).eq(index).then((btn)=>{

            //this avoid the error triggered bu the click method.
            //cy.once('uncaught:exception', () => false);

            //remember we need to wrap $el or btn parameter to do click on it,
            cy.wrap(btn).click();
            });

            //Adding items to a chart
            cy.get('#add-to-cart-button').click();

            //Finding green icon
            cy.get('#NATC_SMART_WAGON_CONF_MSG_SUCCESS > .a-box > .a-box-inner > .a-icon').should(`be.visible`);
            
            //Verifying also with the string
            cy.get('.a-size-medium-plus').should(`contain`, `Agregado al carrito`)
             addedItems.push({index, textTitle});
             cy.log(addedItems);
             cy.log(`index: ${index} of ${textTitle} added, length now is ${addedItems.length}`);

            //Going back to be able to repeat all the loop again.
            cy.go(`back`);
            
            //this avoid the error triggered bu the click method.
            cy.once('uncaught:exception', () => false);
            cy.wait(2000);
            cy.go(`back`);
            
            //Verifying that we are correcltly in the main menu
            cy.get('.s-no-outline > .a-row > .a-size-base').should(`be.visible`);
            
            //this avoid the error triggered bu the click method.
            cy.once('uncaught:exception', () => false);
          }else{
            ignoredItems.push({index, textTitle});
            cy.log(`The index: ${index} called ${textTitle} was added to ignored items list`)
            cy.log(ignoredItems);
        }
      })
  })

  it.skip("Fail - Testing the UI of the items within the list", ()=>{
    //Going into Amazon -> with before each hook
    //cy.visit("https://www.amazon.com/");
    //we need refresh with F5 the webpage 'cuz the nav bar appears different sometimes
    cy.reload();
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //accessing to the content class
    cy.get(".sg-col-20-of-24:visible").should(`be.visible`);
    //veryfing if has 27 elements in the DOM.
    cy.get(".sg-col-20-of-24:visible").should(`have.length`, 27);
    //Trying to find an element inside the class
    cy.get(".sg-col-20-of-24:visible").find(`.s-image`).should(`be.visible`);
    //extracting the text displayed in the thirty item  within the list.
    cy.get(".sg-col-20-of-24:visible").eq(2).find(`.a-price-whole`).then((price)=>{
      cy.log(price.text());
    });
  })

  it.skip("PASS- Optimization of the last test case", ()=>{
    //When you are using too many time the same label, you can grab it with a new name with as 
    //the reserved label "as" works as a variable const, let, in the meaning that you can grab a value there.
    
    //Going into Amazon -> with before each hook
    //cy.visit("https://www.amazon.com/");
    //we need refresh with F5 the webpage 'cuz the nav bar appears different sometimes
    cy.reload();
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //Creating a new name for the selctor with AS word
    cy.get(".sg-col-20-of-24:visible").as(`allCelphones`)
    //accessing to the content class
    //We add an @ before to call the name of the selector.
    cy.get("@allCelphones").should(`be.visible`);
    //veryfing if has 27 elements in the DOM.
    cy.get("@allCelphones").should(`have.length`, 27);
    //Trying to find an element inside the class
    cy.get("@allCelphones").find(`.s-image:visible`).should(`be.visible`);
    //extracting the text displayed in the thirty item  within the list.
    cy.get("@allCelphones").eq(2).find(`.a-price-whole`).then((price)=>{
      cy.log(price.text());
    });
  })

  it.skip("PASS- Testing checkboxes on Amazon",()=>{
    //When you are using too many time the same label, you can grab it with a new name with as 
    //the reserved label "as" works as a variable const, let, in the meaning that you can grab a value there.
    //cy.visit("https://www.amazon.com/");
    //we need refresh with F5 the webpage 'cuz the nav bar appears different sometimes
    cy.reload();
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //Selecting Google checkbox
    cy.get('li[aria-label="Google"]').find('input[type="checkbox"]').check({force: true})
    //Selecting 128 GB checkbox
    cy.get(`li[aria-label="128 GB"]`).find('input[type="checkbox"]').check({force: true})
    
    //Going into a celphone that has other checkbox inside him
    //Doesn't allow to click by an error in the render inside cypress.
    cy.get(`h2.a-size-mini:visible`).eq(1).should(`contain`,`Google Pixel`);
    cy.get(`img.s-image`).eq(1).click();
    //Going to the checkbox, doing also multiple assertions.
    cy.get('#gift-wrap').check().should(`be.checked`).and(`have.value`,`yes`);
    //Unchecking the checkbox and verifying that was unchecked.
    cy.get('#gift-wrap').uncheck().should(`not.be.checked`);

    cy.go(`back`);
    cy.wait(3000);
  });

  it.skip("PASS- Testing with multiple checkboxes on Amazon", ()=>{
      //Going into Amazon -> with before each hook
       // cy.visit("https://www.amazon.com/");
      //we need refresh with F5 the webpage 'cuz the nav bar appears different sometimes
      cy.reload();
      //typing in the search bar google pixel 8
      cy.get("#twotabsearchtextbox").type("Google Pixel 8")
      //doing click on the search button
      cy.get('#nav-search-submit-button').click();
      //Trying to select multiple checkboxes.
      cy.get(`ul[data-csa-c-content-id="36816607011"]`).find(`[data-csa-c-type="element"]`).each(($el, index, $list)=>{

        const text = $el.find(`[class="a-size-base a-color-base"]`).text();

        if(text.includes(`Android`)){
          cy.wrap($el).find('input[type="checkbox"]').check({force: true});
        }else{
          cy.log(`There's no Android in the list`);
        }
      })
      //We need the selector of the checkbox that also has another value to decide which one should be selected. 
      //In Amazon, there's no selector with values, only with the checkbox's selector, so it's imposible to decide
      //which one could be selected or not.
  })

  it.skip("Rahul shetty - Testing multiple checkboxes", function () {
    //Check boxes
    //Going into Amazon -> with before each hook
       // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked")
      .and("have.value", "option1");
    cy.get("#checkBoxOption1").uncheck().should("not.be.checked");
    //Here he puts the value of each checkbox in an array, only the one that will be checked will be in the array
    //If we haven't had a value in the checkbox, it won't be possible to check it.
    cy.get('input[type="checkbox"]').check(["option2", "option3"]);
  })

  it.skip("Rahul shetty - Testing dropdowns", ()=>{
    //Going into Amazon -> with before each hook
    // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    //Static Dropdown
    cy.get("select").select("option2").should("have.value", "option2");
    //Dynamic dropdowns
    cy.get("#autocomplete").type("ind");
  });

  it.skip("PASS - Testing dropdowns on Amazon",()=>{
    //We have two types of dropdowns Statics and dynamic.

    //the reserved label "as" works as a variable const, let, in the meaning that you can grab a value there.
    //Going into Amazon -> with before each hook
    // cy.visit("https://www.amazon.com/");
    //we need refresh with F5 the webpage 'cuz the nav bar appears different sometimes
    cy.reload();
  
    //DYNAMIC DROPDOWN

    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type(`Google Pixel`);

    cy.wait(3000);
      
    cy.get(`div[class="two-pane-results-container"] div[class="s-suggestion s-suggestion-ellipsis-direction"]`).each(($el, index, $list)=>{
      cy.log($el.attr(`aria-label`));
      if($el.attr(`aria-label`) == `google pixel 7`){
        cy.wrap($el).click();
      }else{
        cy.log(`There's no Google Pixel 7 in the list in ${index}`);
      }

    });
    
    //STATIC DROPDOWN
    cy.get(`#a-autoid-0`).click();
    cy.get(`ul[class="a-nostyle a-list-link"] li[class="a-dropdown-item"]`).each(($el, index, $list)=>{

      //Remember that it's a JQ object, we have to resolve the promise, with each method, automatically resolve the promise.
      if($el.text() == (`Los más vendidos`)){
        cy.wrap($el).click();
      }else{
        cy.log(`There's no matched text in the list in ${index}`);
      }
    })
    cy.get('.a-dropdown-prompt').should(`contain`, `Los más vendidos`);	
  });
  
  it.skip("PASS - Testing the Hover function with SHOW", ()=>{
    
  cy.visit("https://www.amazon.com/");

  cy.reload()
  
    cy.get('#nav-flyout-icp').invoke(`show`).find(`.nav-flyout-content`).invoke(`show`)
    cy.contains(`DE`).click({force: true});
    cy.wait(2000)
  })

  it.skip("Rahul shetty - Testing iFrames", ()=>{
    //iFrame it's a HTML document embedded in another HTML document
    //we need to install a plug-in -> npm install -D cypress-iframe and import it: import `cypress-iframe`

    //We use iFrames when the ebpage have the iframe tag on it and we need to interact with it.
    //to enable it to use it we need to call cy.frameLoaded();

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.frameLoaded(`#courses-iframe`)
    //we need to tell cypress that have to switch to iframe mode with cy.frame
    //then, we need to pass there the class, id... that exist in the iframe.
    //CHROPATH extention, is not able to find the elements inside the iframe
    cy.iframe().find(`a[href*="mentorship"]`).eq(0).click();
    //cy.iframe().find("h1[class*=`pricing-title`]").should(`have.length`, 1);
  })

});

//USAR IT CON FUNCTION(){})!! NO CON ()=>{}
describe("Testing Amazon, improving new methodologies", ()=>
{
  beforeEach(function(){
    cy.fixture("example").then(function(data){
      this.data = data;
    });
    cy.switchLang(`ES`);
    cy.log("Before each hook executed");
})

  it.skip("Rahul Shetty - fixtures",function(){
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    //Otra forma de llama al selector:
    cy.get('input[name="name"]:nth-child(2)').type(this.data.name);
    cy.get("select").select(this.data.gender);
    cy.get("body > app-root > form-comp > div > h4 > input").should(
      "have.value",
      this.data.name
    );
    cy.get('input[name="name"]:nth-child(2)').should(
      "have.attr",
      "minlength",
      2
    );
    cy.get("#inlineRadio3").should("be.disabled");
    cy.get(
       "body > app-root > app-navbar > div > nav > ul > li:nth-child(2) > a").click();
  
  });

  it.skip("Fail - Amazon with fixtures - Login assertions",function(){
    cy.visit(this.data.urlAmazon);
    //Searching phone on search field
    cy.get("#twotabsearchtextbox").type(this.data.searchPhone);
    cy.get("#nav-link-accountList > span > span").click()
    cy.get("#createAccountSubmit").click();
    cy.get("#ap_customer_name").type(this.data.username);
    cy.get("#ap_email").type(this.data.email);

    //Veryifing if the password matches
    cy.get("#ap_password").type(this.data.userPass);
    cy.get("#ap_password_check").type(this.data.shortPass);
    cy.get("#continue").click();
    cy.get('#auth-password-mismatch-alert > .a-box-inner > .a-alert-content:visible').should(`contain`,`Las contraseñas no coinciden`)

    //Veryfing if the password have lengh of 6 min.
    cy.get("#ap_password").clear().type(this.data.shortPass);
    cy.get("#ap_password_check").clear().type(this.data.shortPass);
    cy.get("#continue").click();
    cy.get('#auth-password-invalid-password-alert > .a-box-inner > .a-alert-content').should(`contain`,`Se requiere un mínimo de 6 caracteres`).and(`have.css`,"7");
    cy.get("#ap_password").clear().type(this.data.userPass);
    cy.get("#ap_password_check").clear().type(this.data.userPass);
    cy.get('#auth-password-invalid-password-alert > .a-box-inner > .a-alert-content').should(`not.have.text`,`Se requiere un mínimo de 6 caracteres`);

    //Vertyfing if accepts a email.
    cy.get("#ap_email").clear().type(this.data.email).should(`have.attr`,`type`,`email`);

    //Veryfing if accepts a number phone.
    cy.get("#ap_email").clear().type(this.data.phoneNum);
    cy.get('.country-display-text').click();
    cy.get('.a-popover-inner ul li a').each(($el, index, $list)=>{
      const [country, ...num] = $el.text().split(` `);
      cy.log(country)
      if((`${country} `) === this.data.country){
        cy.wrap($el).click();
      }else{
        cy.log($el.text() + ` is not equal to ${this.data.country}`)
      }
    })
  });

  it.skip("PASS - Amazon with fixtures - Selecting items",function(){
    cy.visit(this.data.urlAmazon);
    cy.reload();
    //Searching the phone.
    cy.get("#twotabsearchtextbox").type(this.data.searchPhone[0])
    cy.get(`#nav-search-submit-button`).click();
    
    cy.findTitle(this.data.searchPhone[0]);

  })

  it.skip("PASS - Aadding items to a chart with commands",function(){
    //We need to search the phone.
    cy.searchProduct(this.data.searchPhone[0])

    //Here we pass the number 0 of index stored in the array
    cy.addToCart(this.data.searchPhone)
  })

  it.skip("PASS - iterating items from an array in fixtures",function(){
    this.data.searchPhone.forEach((phone)=>{
      cy.get('#twotabsearchtextbox').clear();
      cy.searchProduct(phone);
    });
  });

  it.skip("PASS - Debugging with Cypress",function(){
    //You only need to use .debug() or .pause()
  })

  it.skip("Page Object Model Design on Amazon",function(){
    //each page with different endpoint or html that reload the entiere webpage needs
    //to be created in separated classes.
    const homePage = new HomePage();

    homePage.searchBar().type(this.data.searchPhone[0]);
    homePage.btnSubmit().click();

  })

  it.skip("Sum products on Amazon", function () {
    const homePage = new HomePage();
    //We need to search the phone.
    cy.searchProduct(this.data.searchPhone[1])
    cy.addToCart(this.data.searchPhone[1]);
  })
})