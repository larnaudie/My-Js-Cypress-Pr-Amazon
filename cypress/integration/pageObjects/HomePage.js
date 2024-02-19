"use strict";

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

export default HomePage;