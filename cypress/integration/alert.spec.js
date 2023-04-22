/// <reference types="cypress"/>

describe('Work with alert´s... ', ()=> {
   before(() =>{
      cy.visit('https://wcaquino.me/cypress/componentes.html')
   })

   beforeEach(() =>{
      cy.reload()
   })

   //alert é um evento que vem do windows, o medoto on pega eventos do windows
   it('Alert',()=> {
      cy.get('#alert').click()
      cy.on('window:alert', msg =>{
         expect(msg).to.be.equal('Alert Simples')
      })
   })

      //alert com mock
      it.only('Alert with mock',()=> {
         const stub = cy.stub().as('alerta') //aqui estou criando um mock e com o .as estou nomeando o mock
         cy.on('window:alert', stub) //veja que aqui diferente do exp. acima eu só coloco o stub, pois ele substitui o método
         cy.get('#alert').click().then(() =>{ //já faço a assertiva aqui
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples') //para pegar a primeira chamada coloco 0
         })
      })
})