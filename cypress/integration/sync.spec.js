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

   it('Must retry', () =>{//o cypress fica retestando o mesmo campo até todos os teste passarem
      cy.get('#novoCampo').should('not.exist')
      cy.get('#buttonDelay').click() //ativando o campo
      cy.get('#novoCampo').should('not.exist') // buscando o campo e colocando um teste antes do existe para dar tempo do campo aparecer
      cy.get('#novoCampo')
         .should('exist') // o campo existe
         .type('Está funcionando') //e escrevendo nele
   })

   it('Click retry', () =>{
      cy.get('#buttonCount')
         .click()
         .click() // para conseguir alcançar 111, precisa de executar mais uma vez o click para dar tempo de aparecer 3 '1'
         .should('have.value', '111')
   })

   it('Use of find',() =>{ // o fin vai buscar um elemento dentro do elemento
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
   it('Use of timeout', () =>{ //o CYpress leva uns 4 segundos para executar os teste
      cy.get('#buttonListDOM').click()
      cy.get('#lista li span', {timeout: 10000}) 
               .should('contain', 'Item 2')    
   })

   //diferença entre should e then (o should ele fica executando o comando até finalizar todos os passos, já o then ele só impime após realmente validar a promise, ou procura)
   it('Should vs Then', () =>{
      cy.get('#buttonListDOM').click()
      cy.get('#lista li span').then($el => {// aqui ele faz a busca e depois pego a promise, o elemento dentro que virá de dentro do html
                                             //ele é uma query, não mais um elemento do cypress que tratariamos com o should, então usamos o then 
         expect($el).to.have.length(1)
      }) 
   })

   //outra diferença, colocando o return, o should ele ignora o que está dentro do return, ele vai sempre retornar ao final da execução o mesmo objeto que ele recebeu 
   it('Another difference between Shoul and Then', () =>{
      cy.get('#buttonListDOM').should($el => {
         expect($el).to.have.length(1)
         return 2 //aqui não vai dar certo com o then, apenas com o should, pois o should ignora o return 
      }).and('have.id', 'buttonListDOM')
   })

   // já o then se eu colocar o return, eu consigo alterar o retorno do then
   //veja como ficaria o return com o then, já que só ele considera o return
   it.only('Another difference between Should and Then II', () => {
      cy.get('#buttonListDOM').then($el => {
         expect($el).to.have.length(1)
         return 2  
      }).and('equal', 2) //aqui estou alterando o resultado para que o return seja igual a 2
         .and('not.have.id', 'buttonListDOM')
   })
   //se vc precisa fazer novas buscas, faça com o then pois o should entra em loop
   it.only('Another difference between Should and Then III', () => {
      cy.get('#buttonListDOM').then($el => {
         expect($el).to.have.length(1)
         cy.get('#buttonList') // fazendo busca de outro botão, por exemplo
      })
   })
})