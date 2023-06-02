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
        //cy.get(loc.MENU.HOME)
    })
    it('Create an account', () => {
        cy.intercept('POST', '/contas',
            [{
                id: 3,
                nome: 'Conta de teste',
                visivel: true,
                usuario_id: 1
            }]
        ).as('createAccount')

        cy.acessarMenuConta()
        cy.intercept('GET', '/contas',
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
        ).as('saveAccounts')

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
        ).as('changeAccount')

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
        cy.intercept('POST', '/contas',
            {
                error: 'Já existe uma conta com esse nome!',
                statusCode: 400
            }
        ).as('saveRepeatedAccount')

        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE)
            .should('contain', 'code 400')
    })
    it('Should create a transaction', () => {
        cy.intercept('POST', '/transacoes',
            {
                id: 31433,
                descricao: 'conta via front',
                envolvido: 'euuu',
                obeservacoes: null,
                tipo: 'REC',
                data_transacao: '2019-11-13T03:00:00000Z',
                data_pagamento: '2019-11-13T03:00:00000Z',
                conta_id: 31433,
                usuaruio_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            }
        )
        cy.intercept('GET', '/extrato/**',
            {
                fixture: 'movimentacaoSalva'
            }
        )

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })
    it('Should get balance', () => {
        cy.intercept('GET', '/transacoes/**',
            {
                "conta": "Conta para saldo",
                "id": 1640349,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2023-05-27T03:00:00.000Z",
                "data_pagamento": "2023-05-27T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 1751925,
                "usuario_id": 33439,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        )

        cy.intercept('PUT', '/transacoes/**',
            {
                "conta": "Conta para saldo",
                "id": 1640349,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2023-05-27T03:00:00.000Z",
                "data_pagamento": "2023-05-27T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 1751925,
                "usuario_id": 33439,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        )
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '15.000')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_EXTRATO('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.intercept('GET', '/saldo',
            [
                {
                    conta_id: 9991,
                    conta: 'Carteira',
                    saldo: '4034.00'
                },
                {
                    conta_id: 9992,
                    conta: 'Banco',
                    saldo: '100000.00'
                }
            ]
        ).as('balanceEnd')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })
    it('Should remove a transaction', () => {
        cy.intercept('DELETE', '/transacoes/**',
            {
                response: '',
                statusCode: 204
            }).as('del')
        cy.get(loc.MENU.EXTRATO)
            .click()
        cy.xpath(loc.EXTRATO.FN_XP_DELETAR_EXTRATO('Movimentacao para exclusao'))
            .click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
    it.only('Should validate data send to create an account', () => {
        cy.intercept('POST', '/contas',
            [
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
            ]
        ).as('createAccount')

        cy.acessarMenuConta()
        cy.intercept('GET', '/contas',
            [
                { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
            ]
        ).as('saveAccounts')

        cy.inserirConta('{CONTROL}') 
        cy.get(loc.MESSAGE)
            .should('contain', 'Conta inserida com sucesso')
    })
})