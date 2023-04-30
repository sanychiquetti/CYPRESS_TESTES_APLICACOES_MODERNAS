/// <reference types="cypress" />

describe('Test dinamics', () =>{
   beforeEach(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html')
   })

   //como são 4 opções de comida, para não ficar repetindo vamos criar uma array com as opções
   const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']// aqui vamos buscar pelo label
   foods.forEach(food =>{
      it(`Cadastro com a comida ${food}`, () => {
         cy.get('#formNome').type('Cler')
         cy.get('#formSobrenome').type('Chiquetti')
         cy.get(`[name=formSexo][value=F]`).click()
         cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
         cy.get('#formEscolaridade').select('Doutorado')
         cy.get('#formEsportes').select('Corrida')
         cy.get('#formCadastrar').click()
         cy.get('#resultado> :nth-child(1)').should('contain', 'Cadastrado!')
      }) 
   })
})