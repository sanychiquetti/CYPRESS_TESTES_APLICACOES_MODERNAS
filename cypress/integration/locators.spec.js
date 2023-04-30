/// <reference types="cypress"/>

describe('Work with basic elements', () =>{
   before(() =>{
      cy.visit('https://wcaquino.me/cypress/componentes.html')
   })

   beforeEach(()=>{
      cy.reload()
   })

   //varias formas de achar mesmo elemento
   it('Using JQuery selector',() =>{
      cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
      cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) >input').click()
      cy.get("[onclick*='Francisco']")  // com o * estamos falando que deve contar a palavra francisco
      cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input') //qdo não temos nenhum dos parametros pre definidos, buscamos pelo irmãos com ~ 
      cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input') //aqui fui buscar pela linha onde ele está, e depois pelos filhos dela.
   })

   it('Using xpath', () =>{
      cy.xpath('//input')
   })
})