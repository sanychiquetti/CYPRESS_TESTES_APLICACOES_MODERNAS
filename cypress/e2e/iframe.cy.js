/// <reference types="cypress"/>

describe('Work with Iframes', () =>{

   it('Deve preencher o campo de texto', ()=>{
      cy.visit('https://wcaquino.me/cypress/componentes.html')
      cy.get('#frame1').then(iframe =>{
         const body = iframe.contents().find('body') //o contents vai pegar os filhos do iframe, que aqui queremos o body, e colocaremos numa variável
         cy.wrap(body).find('#tfield')
         .type('funciona?')
         .should('have.value', 'funciona?')
      })
      cy.on('window:alert', msg =>{
         expect(msg).to.be.equal('Alert Simples')
      })
   })

   //como o cypress não consegue processar alert de iframe, temos que colocar o endereço direto da iframe
   it('Deve testar frame diretamente', ()=>{
      cy.visit('https://wcaquino.me/cypress/frame.html')
      cy.get('#otherButton').click()
      cy.on('window:alert', msg =>{
         expect(msg).to.be.equal('Click OK!')
      })
   })
})
