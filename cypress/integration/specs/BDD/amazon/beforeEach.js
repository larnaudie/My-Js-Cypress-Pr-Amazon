beforeEach(function(){
    cy.fixture("example").then(function(data){
      this.data = data;
    });
    cy.switchLang(`ES`);
    cy.log("Before each hook executed");
})