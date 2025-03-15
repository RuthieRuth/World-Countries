import "../support/commands";
import "@testing-library/cypress/add-commands";

describe("Countries Application", () => {

    beforeEach(()=>{
        cy.visit("/");
    });
    
    it("displays the navigation bar", () => {
        cy.findByRole("banner").should("exist");
        cy.findByRole("link", { name: "Home" }).should("exist");
        cy.findByRole("link", { name: "Countries" }).should("exist");
        cy.findByRole("link", { name: "Test" }).should("exist");
    });

    it('Shows a list of countries', () => {
        cy.findByRole('link', { name: 'Countries' }).click();
        cy.url().should('include', '/countries');
        cy.get('.MuiCard-root').should('have.length.greaterThan', 200);
    });

    it('Shows more than 200 countries are displayed', () => {
        cy.findByRole('link', { name: 'Countries' }).click();
        cy.get('.MuiCard-root').should('have.length.greaterThan', 200);
    
    });

   
});


/* describe("Searching", () => {
    beforeEach(() => {
      cy.visit("/countries");
    });
  
    it('Search functionality test', () => {
      const searchTerm = 'ghana';
  
      cy.get('input[type="search"]').type(searchTerm);
  
      cy.get('.search-result-item') // ← add the dot
        .should('exist')
        .and('contain.text', searchTerm);
    });
  });
   */