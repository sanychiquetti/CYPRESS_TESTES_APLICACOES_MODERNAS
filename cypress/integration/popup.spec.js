/// <reference types="cypress"/>

describe('Work with Popup', () =>{
   it('Deve testar popup diretamente', () =>{
      cy.visit('https://wcaquino.me/cypress/frame.html')
      cy.get('#otherButton').click()
      cy.on('window:alert', msg =>{
         expect(msg).to.be.equal('Click OK!')
      })
   })

   it.only('Deve verificar se o popup foi invocado', () =>{
      cy.visit('https://wcaquino.me/cypress/componentes.html')
      cy.window().then(win =>{
         cy.stub(win, 'open').as('winOpen')
      })
      cy.get('#buttonPopUp').click()
      cy.get('@winOpen').should('be.called') //aqui ele procura pelo nome que demos ao stub, e valida com o should
   })

   //vamos testar o iframe com link, primeiro vamos ver se o link está apontando para o endereço correto

   describe.only('Work with popup with link', ()=>{
      beforeEach(() =>{
            cy.visit('https://wcaquino.me/cypress/componentes.html')
         })

      it('Check popup url', () =>{
         cy.contains('Popup2')
         .should('have.prop', 'href')
         .and('equal', 'https://wcaquino.me/cypress/frame.html')
      })

      //aqui vamos set uma variável como endereço do link, para não quebrar o test qdo o link for alterado
      it('Should access popup dinamically', ()=>{
         cy.contains('Popup2').then($a =>{
            const href = $a.prop('href')
            cy.visit(href)
            cy.get('#tfield').type('Funcionou!')
         })
      })

      //vamos retirar o _blank para o link não abrir em outra pagina, de outra forma para testarmos com invoke
      it('Should force link on same page', () =>{
         cy.contains('Popup2')
            .invoke('removeAttr', 'target') //pedindo para remover o atributo target
            .click()
         cy.get('#tfield').type('Funcionou...')
      })
   })
})