/// <reference types="cypress"/>

describe('Should test at a funcional level', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('sanymara77@hotmail.com')
        cy.get(':nth-child(2) > .form-control').type('Santope77')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('Create an account', () => {
        cy.get('[data-test="menu-settings"]')
            .click()
        cy.get('[href="/contas"]')
            .click()
        cy.get('[data-test="nome"]')
            .type('sany')
        cy.get('.btn')
            .click()
        cy.get('.toast-success')
            .should('contain', 'Conta inserida com sucesso')
    })

    it.only('Change an account', ()=>{
        cy.get('[data-test="menu-settings"]')
            .click()
        cy.get('[href="/contas"]')
            .click()
        cy.xpath("//table//td[contains(.,'sany')]/..//i[@class='far fa-edit']")
            .click()
        cy.get('[data-test="nome"]')
            .clear()
            .click()
            .type('conta alterada')
        cy.get('.btn')
            .click()
    })

    // it('Create repeated account', () => {
    //     cy.get('[data-test="menu-settings"]')
    //         .click()
    //     cy.get('[href="/contas"]')
    //         .click()
    //     cy.get('.form-control')
    //         .type('conta alterada')
    //     cy.get('.btn').click()
    //     cy.get('.toast-error > .toast-message')
    //         .should('contain', 'status code 400')
    // })
})