/*
Para interactuar con las request y response en cypress vamos a tener que usar

CY.INTERCEPT()

Alli luego le colocamos dos parametros, requestobject y responseobject, van 
entre corchetes 

cy.intercept({req},{res})

Primnero tenemos que poner la solicitud que quremos ver.
El metodo que se utiliaza es GET, 
{method: 'GET'}

Luego debemos colocar la URL
{ method: 'GET',
url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
}

Cypress no va a hacer la llamada, solo escuchara la llamada en el navegador que sea hecha.
Una vez que Cypress escucha esa request, dice: ¿quiero enviar la respuesta real, o
si deseamos simular la respuesta y enviar una respuesta propia?

En este escenario solo queremos simularla, copiarla, hacerle la copia. mock it.
Ahora en la repsuesta, escribimos lo que queremos obtener de la respuesta.
La estructura 
https://docs.cypress.io/api/commands/intercept#Request-object-properties
Las propiedades que permite request son:

Body: string | object | any

Headers:{ [key:string]: string }

Method: string

Url: string,

query: Record< string, string|number>,

httpVersion: string

Para agarrar la respuesta real, vamos a Postman o insomnia y copiamos la respuesta real que nos da la url, vamos a editarla 
y a decirle que solamente obtenga un libro especifico, por ejemplo;
{
		"book_name": "Angular",
		"isbn": "RS475",
		"aisle": "227"
}

*/
"use strict"; 
/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe';

//https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty
describe("My backend test", ()=>{

    it("Backend test 1", ()=>{
        
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
        //aca estamos mandando una request y simulando la respuesta modificada por nosotrs.
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
        {
            statusCode: 200,
            body: [ {
                    "book_name": "Angular",
                    "isbn": "RS475",
                    "aisle": "227"   
                }
            ]
        }).as(`bookretrievals`); //aca estamos alamcenando todo el intercept en una palabra, objeto.
        //Lo ponemos despues por que cuando cypress escuche ese click, enviara
        //le respuesta de la linea statusCode: 200
        cy.get("button[class='btn btn-primary']").click();
        //Ahora le indicamos que vamos a esperar a que cypres intercepte la respuesta.
        cy.wait(`@bookretrievals`)
        cy.get(`p`).should(`have.text`, `Oops only 1 Book available`)
    })
})