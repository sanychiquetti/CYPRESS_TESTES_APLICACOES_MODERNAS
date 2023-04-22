/// <reference types="cypress" />

describe('Work with basic elements', () =>{
   // vamos criar hooks:
   //aqui nesse hooks before, vou pedir para execute esse primeiro, dentro desse grupo, que é entrar no site
   before(() =>{ // se colocar beforeEach, ele vai executar antes de cada teste
      cy.visit('https://wcaquino.me/cypress/componentes.html')
   })

   //posso usar o beforeEach com o reload, para limpar a tela antes de cama teste
   beforeEach(() =>{
      cy.reload()
   })

   it('Text', () => {
      // vamos verificar se um determinado texto está em um determinado lugar da tela
      //para isso vamos pegar a tag onde ele está (aqui é num span de nome facilAchar)
      cy.get('.facilAchar').should('contain', 'Cuidado')
      //agora vamos validar a frase completa:
      cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
   })

   //vamos criar testes em links:
   it('Links', () =>{
      //vamos pegar os dados de um link no site  eclicar nele
      cy.get('[href="#"]').click()

      //agora vamos validar se foi executado a ação, validando se o texto de resutado apareceu
      cy.get('#resultado').should('have.text', 'Voltou!')

      //posso fazer essa busca no lugar de get usando contains:
      cy.contains('Voltar').click()

      // teste deve ser o mesmo!
      cy.get('#resultado').should('have.text', 'Voltou!')
   })

   //agora vamos escrever nos campos:
   it('TextField', () =>{
      
      cy.get('#formNome') // procurar o campo
         .type('Cypress Test') // escrever nele
         .should('have.value', 'Cypress Test')//vamos testar se foi escrito, pegando o valor(value) nele

      cy.get('#elementosForm\\:sugestoes') //procurando campo text area
         .type('Hello World!') //escrevendo nele

      cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')//campo input
         .type('Every Body')

      cy.get('[data-cy=dataSobrenome]')
         .type('Silva 12345{backspace}{backspace}') // com o backspace, estou pedindo para apagar o ultimo valor digitado, como pedi 2x, vai apagar o 4 e 5
         .should('have.value', 'Silva 123') //vamos validar que ele escreveu o que queriamos 

      //agora vamos apagar o que tem em um campo:
      cy.get('#elementosForm\\:sugestoes')
         .clear() // aqui ele apaga o que tem no campo
         .type('Who are you?{selectall}How are you?', {delay:100})  //com o selectall, ele apaga a palavra toda, e já escreve a na sequência, o delay é para fazer devagar
         .should('have.value', 'How are you?')
   })

   //nos radio box, só um pode ficar clicado
   it('RadioButton', () =>{
      cy.get('#formSexoFem')
         .click()
         .should('be.checked') // validando que está clicado

      //vamos validar que o masculino continua desclicado
      cy.get('#formSexoMasc')
         .should('not.be.checked')

      //vamos validar que existe dois campos para escolha nessa caixa
      cy.get('[name="formSexo"]')
         .should('have.length', 2) 
   })

   //nos check box mais de um pode permanecer clicado
   it('CheckBox', () =>{
      cy.get('#formComidaPizza')
         .click()
         .should('be.checked')

      //posso pedir para clicar em todos de uma vez
      cy.get('[name=formComidaFavorita]')
         .click({multiple: true})// como são vários precisa desse {multiple: true}
        
      cy.get('#formComidaPizza').should('not.be.checked') // pois como já haviamos clicado, ele desclicou no comado acima
      cy.get('#formComidaVegetariana').should('be.checked')
   })
   //em campo de multipla escolha, mas apenas uma pode ser selecionada
   it.only('Combo', () =>{
      cy.get('[data-test=dataEscolaridade]')
         .select('2o grau incompleto') //aqui ele aceita o que esta na descrição da tag
         .should('have.value', '2grauincomp') // aqui ele só aceita o que esta na classe da tag

         //validar as opções do combo, 
         cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8) //consigo validar as qdades
         
         //ver os elementos dessa lista:
         cy.get('[data-test=dataEscolaridade] option').then($arr =>{
            const values = [] //guardar esses valores numa array
            $arr.each(function() {
               values.push(this.innerHTML) //aqui vou pegar o valor escrito dentre as tags e colocar dentro da array
            })
            expect(values).to.include.members(['Superior','Mestrado']) //aqui estou validando que dentro da array, os valores foram encontrados
         })
   })

   //em campo de multipla escolha, posso escolhar mais que uma
   it.only('Combo Multiplo', () =>{
      cy.get('[data-testid=dataEsportes]')
         .select(['natacao', 'Corrida', 'Karate']) //colocao aqui as que quero selecionar mas pelo value

         //validar as opções selecionadas do combo multiplo,
      cy.get('[data-testid=dataEsportes]').then($el =>{
         expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'Karate']) // essa é uma forma
         expect($el.val()).to.have.length(3)
      })

      //outra forma agora com invoke
      cy.get('[data-testid=dataEsportes]')
         .invoke('val')
         .should('eql',['natacao', 'Corrida', 'Karate'] )
   })
})