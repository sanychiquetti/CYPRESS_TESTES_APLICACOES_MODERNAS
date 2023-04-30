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

   //Evento confirme (ele tem dois botões ok e cancelar)
   it.only('Confirm',()=> {
      cy.on('window:confirm', msg =>{
         expect(msg).to.be.equal('Confirm Simples')
      })
      cy.on('window:alert', msg =>{
         expect(msg).to.be.equal('Confirmado')
      })
      cy.get('#confirm').click()
   })

   //Vamos fazer uma negativa, se a escolha for cancelar
   it.only('Deny',()=> {
      cy.on('window:confirm', msg =>{
         expect(msg).to.be.equal('Confirm Simples')
         return false //aqui estou pedindo para cancelar
      })
      cy.on('window:alert', msg =>{
         expect(msg).to.be.equal('Negado')
      })
      cy.get('#confirm').click()
   })

   //evento prompt
   it.only('Prompt',()=> {
      cy.window().then(win =>{
         cy.stub(win, 'prompt').returns('42') //criar o mock e precisamos falar para ele qual retorno queremos 
      })
      cy.on('window:confirm', msg =>{
        expect(msg).to.be.equal('Era 42?')
      })
      cy.on('window:alert', msg =>{
         expect(msg).to.be.equal(':D')
      })
      cy.get('#prompt').click()
   })
})