/// <reference types="cypress" />

describe('Esperas...', () =>{

   before(() =>{
      cy.visit('https://wcaquino.me/cypress/componentes.html')
   })

   beforeEach(() =>{
      cy.reload
   })

   it('Must wait for the element to be available', () =>{

      cy.get('#novoCampo').should('not.exist') //validando que o campo não está disponível
      cy.get('#buttonDelay').click() //ativando o campo
      cy.get('#novoCampo').should('not.exist') //procurando para dar tempo de ele aparecer
      cy.get('#novoCampo').should('exist') // o campo existe
      cy.get('#novoCampo').type('Está funcionando') //e escrevendo nele
            
   })

   it('Must retry', () =>{
      cy.get('#novoCampo').should('not.exist')
      cy.get('#buttonDelay').click() //ativando o campo
      cy.get('#novoCampo').should('not.exist') // buscando o campo
      cy.get('#novoCampo')
         .should('exist') // o campo existe
         .type('Está funcionando') //e escrevendo nele
   })

   it.only('Use of find',() =>{ // o fin vai buscar um elemento dentro do elemento
      cy.get('#buttonList').click() // buscando e clicando no botao lista
      cy.get('#lista li') //buscando o elemento li na lista
            .find('span') // buscando o elemento span dentro do elemento li
            .should('contain', 'Item 1') //validando item

      /*vamos pegar o item 2 que só aparece após um tempo, precisamos colocar
      os passos novamente, pois o cypress faz a busca apens do que está perto do comando
      então ficariamos limitados ao campo do item 1, e não acharia o campo 2*/
      cy.get('#lista li span') // não precisa do find aqui
         .should('contain', 'Item 2') 

      //exemplo com um botão que apaga o item 1 para depois aparecer o item 1 e 2, tb funciona assim:
      cy.get('#buttonListDOM').click()
      cy.get('#lista li') 
               .find('span') 
               .should('contain', 'Item 1') 
      cy.get('#lista li span') 
               .should('contain', 'Item 2') 
   })   
   
   // o timeout é o tempo que ele vai ficar executando o teste até que a respota seja positiva
   it.only('Use of timeout', () =>{ //o CYpress leva uns 4 segundos para executar os teste
      cy.get('#buttonListDOM').click()
      cy.get('#lista li span', {timeout: 10000}) 
               .should('contain', 'Item 2')    
   })
})