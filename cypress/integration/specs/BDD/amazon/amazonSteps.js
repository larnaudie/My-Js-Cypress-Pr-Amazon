/// <reference types="Cypress" />
import {GIVEN, THEN, WHEN, AND} from "cypress-cucumber-preprocessor/steps";
const homePage = new HomePage();

GIVEN("I open Amazon webpage and choose a language", () => {

    cy.fixture("example").then(function(data){
        this.data = data;
      });
      cy.switchLang(`ES`);
      cy.log("Before each hook executed");
      
})
WHEN("I search for a phone", () => {
    //We need to search the phone.
    cy.searchProduct(this.data.searchPhone[1])
})
AND("I add all of them to a cart", () => {

    cy.addToCart(this.data.searchPhone[1]);
})
THEN("Then should be added to the cart.", () => {
    
})