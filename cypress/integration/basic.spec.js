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

      cy.pause() //ele para a execução, até que vc peça para continuar, mas vc pode pedir para fazer passo a passo
      //pode tb ser assim para ser menos verboso:
      cy.title()
         .should('be.equal', 'Campo de Treinamento')
         .and('contain', 'Campo')

         //TODO imprimir o log no console
         //TODO imprimir o title em um campo de texto
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

