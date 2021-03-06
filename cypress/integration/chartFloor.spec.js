/// <reference types="cypress"/>

beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    const email = 'root@tietoevry.com';
    const password = '123456aB@';
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').should('contain', 'Sign In').click();
    cy.url().should('include', '/newBooking')

})
const nowTime = Cypress.moment().format('DD-MM-yyyy')

describe("Chart Floor", () => {
    it("show Statistics", ()=> {
        cy.get("#statistics").click({force: true})
        cy.get(".dateInput").first().click()
        cy.get(".dateInput").first().invoke('val').then((text) => {
            expect(nowTime).to.equal(text);
        })
       // click prev month

        //choose date 1
        cy.contains('24').click();
        cy.get(".dateInput").first().invoke('val').then((text) => {
            expect('24-11-2020').to.equal(text);
        });
        cy.get("#dropdownMenuButton").click()
        cy.contains('2').click()

        cy.get("#dropdownMenuButton").invoke('val').then((text) => {
            expect('2').to.equal("2");
        });
    })
})