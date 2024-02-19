// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('selectProduct', (strTitle) => {  
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
    if(textTitle.includes(strTitle)){
      //this avoid the error triggered bu the click method.
      cy.once('uncaught:exception', () => false);
      //Applying the THEN method to handle the variable out of cypress.
      cy.get($el).find(`a.a-link-normal`).then((btn)=>{
      //this avoid the error triggered bu the click method.
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
})

Cypress.Commands.add('switchLang', (lang) => {
    cy.visit("https://www.amazon.com/")
    cy.reload();
    cy.get(`#icp-nav-flyout span[class="nav-line-2"] div`).each(($el, index, $list) => {
    $el.click()
    if($el.text() === `EN`){
      $el.find(`span[class="icp-nav-link-inner"]`).click()
      //cy.wait(3000)
      cy.get(`span[dir="ltr"]`).each(($el, index, $list) => {
        if($el.text() == lang){
          cy.log(`${$el.text()} contains the text español`)
          $el.click();
          cy.get(`input[aria-labelledby="icp-save-button-announce"]`).should(`have.class`,`a-button-input`).click()
        }else{
          cy.log(`_${$el.text()}_ does not contains the text Español`)
        }
      })
    }
    })
})

Cypress.Commands.add('findTitle', (strTitle) => {
  /*
    const item = cy.get("[data-asin]").find('h2.a-size-mini')
    item.each(($el, index, $list) => {
        
    //Remember, this can't be handeld by cypress itself
    const textTitle = $el.text();
    //this directly won't work
    //cy.get($el).find(`a.a-link-normal`);
    //$el.text();

    //Veryfing in console the value of the $el
    cy.log(textTitle);
    //Adding some logic to select ONLY the items with the following string
    //This strTitle contained Google pixel 8
        if(textTitle.includes(strTitle)){
            cy.log(textTitle);
            return textTitle;
    //cy.wait(5000)
        }else{
            cy.log(`There weren't matched strings, ${textTitle}`)
        }
    })*/

    //This was written by ChatGPT
    //Creates an empty array to store all the valid elements
    let matchingTitles = [];

    //We accessed to the selector that contains all texts and stored them into a variable textTitle
    cy.get("[data-asin]").find('h2.a-size-mini:visible').each(($el, index, $list) => {
      const textTitle = $el.text();

      //to verify the text, we prefered to log it in the console.
     cy.log(textTitle);

     //Conditional logic -> if the textTitle contains the strTitle, we log it
      if (textTitle.includes(strTitle)) {
         cy.log(textTitle);
         //if the $el contains the text, we store it in the variable matchingTitles.
          matchingTitles.push(textTitle);
     } else {
          cy.log(`There weren't matched strings, ${textTitle}`);
      }
    }).then(() => {
      // Rprint in the cypress console, the number of elements that contain the array
      cy.log('Matching titles:', matchingTitles);

      // Ahora puedes realizar más acciones o devolver la variable si es necesario en algún contexto externo
      // Por ejemplo, puedes realizar una nueva aserción con los elementos coincidentes
      expect(matchingTitles).to.have.length.above(0);
      console.log(matchingTitles)
     });
})

Cypress.Commands.add('addToCart', (strTitle) => {
    
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

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })