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

   //vamos selecionar todas as opções de comida usando o each
   it.only('Sholud select all using each', () =>{
      cy.get('#formNome').type('Cler')
         cy.get('#formSobrenome').type('Chiquetti')
         cy.get(`[name=formSexo][value=F]`).click()

         //cy.get('[name=formComidaFavorita]').click({ multiple:true }) //assim ele vai marcar todos que tem esse name igual
         //mas podemos fazer com o each, para colocar uma condição, no que não queremos clicar:
         cy.get('[name=formComidaFavorita]').each($el => {
            //$el.click() // aqui ele vai clicar em cada elemento, mas não tem rasreabilidade
            if($el.val() !== "vegetariano" )// se o valor do elemento for diferente de vegetariano, voce clica
            cy.wrap($el).click() // aqui ele clica em cada elemento, mas tem rastreabilidade
         })
         cy.get('#formEscolaridade').select('Doutorado')
         cy.get('#formEsportes').select('Corrida')
         cy.get('#formCadastrar').click()
         cy.get('#resultado> :nth-child(1)').should('contain', 'Cadastrado!')
         //cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?') // ao clicar na opção vegetariano, ele deu essa mensagem, por isso, não cadastrou, por iso usar o each.
   })
})