
import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
   cy.get(locator).click()
   cy.on('window:alert', msg => {
      expect(msg).to.be.equal(message)
   })
})

Cypress.Commands.add('login', () => {
   cy.visit('https://barrigareact.wcaquino.me/')
   cy.get(loc.LOGIN.USER).type(Cypress.env('user'))
   cy.get(loc.LOGIN.PASSWORD).type(Cypress.env('passwd'))
   cy.get(loc.LOGIN.BTN_LOGIN).click()
   cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
   cy.get(loc.MENU.SETTINGS).click()
   cy.get(loc.MENU.RESET).click()
})

Cypress.Commands.add('getToken', () => {
   cy.request({
      url: '/signin',
      method: 'POST',
      body: {
         email: (Cypress.env("user")),
         redirecionar: 'false',
         senha: (Cypress.env("passwd"))
      }
   }).its('body.token').should('not.be.empty') //não estar vazio validação
      .then(token => {
         Cypress.env('token', token) // assim não precisaremos mais chamar o tokem em todo test, fazendo um comando abaico com overwrite
         return token
      })
})

Cypress.Commands.add('resetRest', () => {
   cy.getToken('user', 'passwd').then(token => {
      cy.request({
         url: '/reset',
         method: 'GET',
         headers: { Authorization: `JWT ${token}` },
      }).its('status').should('be.equal', 200)
   })
})


Cypress.Commands.add('getCountByName', name => {
   cy.getToken('user', 'passwd').then(token => {
      cy.request({
         method: 'GET',
         url: '/contas',
         headers: { Authorization: `JWT ${ token }`},
         qs: {
            nome: name
         }
      }).then(res => {
         return res.body[0].id
      })
   })
})

//com esse comando, estamos colocando o token dentro de cada requisição, não precisando mais chamar o  token
Cypress.Commands.overwrite('request', (originalFn, ...options) => {
   if (options.length === 1) {
      if(Cypress.env('token')){
         options[0].headers = {
            Authorization: `JWT ${Cypress.env('token')}`
         }
      }
   }
   return originalFn(...options)
})