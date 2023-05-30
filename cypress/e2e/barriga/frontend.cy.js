/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsConta'
import buildEnv from '../../support/buildEnv'

describe('Should test at a funcional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login()
        cy.get(loc.MENU.HOME)
    })

    it('Create an account', () => {
        cy.intercept('POST', '/contas',
            [{
                id: 3,
                nome: 'Conta de teste',
                visivel: true,
                usuario_id: 1
            }]
        ).as('outraConta')

        cy.acessarMenuConta()

        cy.intercept( 'GET', '/contas',
            [
                {
                    id: 1,
                    nome: 'Carteira',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'Banco',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'Conta de teste',
                    visivel: true,
                    usuario_id: 1
                }
            ]
        ).as('contasSave')
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE)
            .should('contain', 'Conta inserida com sucesso')
    })

    it('Change an account', () => {

        cy.intercept('PUT', '/contas/**', //esses ** é para qualquer coisa a apartir de /contas 
            {
                id: 1,
                nome: 'Conta Alterada',
                visivel: true,
                usuario_id: 1
            }
        ),

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira'))
            .click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada')
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
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_EXTRATO('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
    })

    it('Should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO)
            .click()
        cy.xpath(loc.EXTRATO.FN_XP_DELETAR_EXTRATO('Movimentacao para exclusao'))
            .click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

    })
})