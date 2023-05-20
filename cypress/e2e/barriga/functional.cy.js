/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsConta'

describe('Should test at a funcional level', () => {
    beforeEach(() => {
        cy.login('user', 'passwd')
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })


    it('Create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE)
            .should('contain', 'Conta inserida com sucesso')
    })

    it('Change an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar'))
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
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE)
            .should('contain', 'status code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534')
    })

    it.only('Should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO)
            .click()
        cy.xpath(loc.EXTRATO.FN_XP_DELETAR_EXTRATO('Movimentacao para exclusao'))
            .click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

    })
})