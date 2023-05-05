/// <reference types="cypress"/>

describe('Should test at a funcional level', () =>{
    before(() =>{
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('sanymara77@hotmail.com')
        cy.get(':nth-child(2) > .form-control').type('Santope77')
        cy.get('.btn').click()
        //validar que ele abriu uma popup mensagem de boas vindas
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Bem vindo, Sany !')
         })
    })

    it('Criando uma conta', () => {

        //inserir uma conta
        cy.get('.dropdown-toggle').click()
        cy.get('[href="/contas"]').click()
        cy.get('.form-control').type('sany')
        cy.get('.far').click()

        //alterar uma conta
        cy.get('tr > :nth-child(2) > :nth-child(1) > .far').click()
        cy.get('.form-control')
            .clear()
            .click()
            .type('conta alterada')
        cy.get('.btn').click()

        //criar conta repetida
        cy.get('.form-control').type('conta alterada')
        cy.get('.btn').click()

    })
})