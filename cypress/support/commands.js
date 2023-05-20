import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
   cy.get(locator).click()
   cy.on('window:alert', msg => {
      expect(msg).to.be.equal(message)
   })
})

Cypress.Commands.add('login', () => {
   cy.visit('/')
   cy.get(loc.LOGIN.USER).type(Cypress.env('user'))
   cy.get(loc.LOGIN.PASSWORD).type(Cypress.env('passwd'))
   cy.get(loc.LOGIN.BTN_LOGIN).click()
   cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
   cy.get(loc.MENU.SETTINGS).click()
   cy.get(loc.MENU.RESET).click()
})