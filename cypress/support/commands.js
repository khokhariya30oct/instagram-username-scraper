Cypress.Commands.add('verifyRedirect', (expectedUrl) => {
  cy.url().should('eq', expectedUrl)
})

Cypress.Commands.add('waitForProcess', () => {
  return cy.get('div.spinner').should('be.visible')
    .get('div.spinner').should('not.be.exist')
})
