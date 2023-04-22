/// <reference types="cypress" />


//acessando um página que vamos trabalhar:
describe('Cypress basics', () =>{
   it.only('Should visit a page and assert title', () =>{
      //acessando a página
      cy.visit('https://wcaquino.me/cypress/componentes.html')

      //vamos validar o título
      cy.title().should('be.equal', 'Campo de Treinamento')
      //ou poderiamos usar:
      cy.title().should('contain', 'Campo').debug() // o debug, de da mais detalhes vai imprimir na tela os passos, mas vai esperar vc clicar para continuar.

     /* cy.pause() //ele para a execução, até que vc peça para continuar, mas vc pode pedir para fazer passo a passo
      //pode tb ser assim para ser menos verboso:
      cy.title()
         .should('be.equal', 'Campo de Treinamento')
         .and('contain', 'Campo')*/

      //imprimir o log no console
      cy.title().then(title =>{
         console.log(title)
      })

      //se eu quiser usar esse title em alguma tela mais pra frente, então guardo ela numa variavel
      let syncTitle 
      
      //imprimir o title em um campo de texto
      cy.title().then(title =>{
         console.log(title)

         cy.get('#formNome').type(title) // até ese passo já fiz a escrita do titulo no campo nome.

         syncTitle = title // aqui é para setarmos a variável e usar depois
      })

      //exemplo usando a variável criada no campo sobrenome
      cy.get('[data-cy=dataSobrenome]').then($el => {
         $el.val(syncTitle)
      })

      //outro exemplo no campo text usando wrap:
      cy.get('#elementosForm').then($el =>{
         cy.wrap($el).type(syncTitle)         
      })

      
   })

   //vamos encontrar e interagir com um elemento:
   it('Should find and interact with an element', () =>{
      //então precisamos visitar a página
      cy.visit('https://wcaquino.me/cypress/componentes.html')

      //e agora procurar o elemento 
      cy.get('#buttonSimple')
         // e clicar nele
         .click()
         //agora o teste para ver se foi executado corretamente
         .should('have.value', 'Obrigado!') // o campo deve ter o valor de "Obrigado!"
   })
})

