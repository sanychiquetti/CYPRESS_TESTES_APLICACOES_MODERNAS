/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsConta'

describe('Should test at a funcional level', () => {
    before(() => {
        cy.login('sanymara77@hotmail.com', 'Santope77')
        cy.resetApp()
    })

    it('Create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get('.toast-success')
            .should('contain', 'Conta inserida com sucesso')
    })

    it('Change an account', ()=>{
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR)
            .click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR)
            .click()
        cy.get(loc.MESSAGE)
            .should('contain', 'Conta atualizada com sucesso')
    })
    it('Cant Create repeated account', () => {
        cy.acessarMenuConta()
        cy.inserirConta()
            .type('conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE)
            .should('contain', 'status code 400')
    })

    it.only('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()
    })
})