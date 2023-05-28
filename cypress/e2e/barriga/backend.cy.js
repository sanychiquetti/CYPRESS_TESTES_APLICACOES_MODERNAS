/// <reference types="cypress"/>

import dayjs from 'dayjs'
describe('Should test at a funcional level', () => {
    //let token //criando a váriavel token

    beforeEach(() => {
        cy.getToken('user', 'passwd')
        // .then(tkn => {
        //     token = tkn // guardando o token dentro da variável token
        // })
        cy.resetRest()
    })

    it('Create an account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //headers: { Authorization: `JWT ${token}` }, // não precisa mais devido já ter criado no commands
            body: {
                nome: 'Conta via rest'
            }
        }).as('response') //dando um nome para encontrar na validação

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id') // estamos validando que no corpo da response veio um id
            expect(res.body).to.have.property('nome', 'Conta via rest') // validndo que o nome veio conforma o nome que demos na criação da conta
        })
    })

    it('Change an account', () => {
        cy.getCountByName('Conta para alterar')
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    //headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'Conta alterada via rest'
                    }
                }).as('response')

                cy.get('@response').its('status').should('be.equal', 200)
            })
    })

    it('Cant Create repeated account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false //aqui avisamos o cypress que sabemos que irá dar erro
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400) // aqui validamos a mensagem de erro
            expect(res.body.error).to.have.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create a transaction', () => {
        cy.getCountByName('Conta para movimentacoes')
            .then(contaId => { // retorno dela vamos chamar de contaId e chamar o metodo
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    //headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        data_transacao: dayjs().format('DD/MM/YYYY'),
                        descricao: 'desc',
                        envolvido: 'inter',
                        status: 'true',
                        tipo: 'REC',
                        valor: '123',
                    }
                }).as('response') //aqui estou renomeando o retorno (resposta) da requisição
            })
        cy.get('@response').its('status').should('to.be.equal', 201) // aqui estou pegando o retorno do alias o conteudo do status e verificando se é igual a 201
    })

    it('Should get balance', () => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            //headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta = null // declarando a varialvel para guardar o valodr de saldoConta
            res.body.forEach(c => { //na resposta do body, vamos fazer um laço, onde para cada conta vamos executar o seguinte bloco
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo // se para essa linha (ele vai olhar linha a linha, ate chegar na linha em questão), c.conta for igual 'conta para saldo', então o saldoConta vai ser receber o valor de c.saldo(onde esta o valor de 534)
            })
            expect(saldoConta).to.be.equal('534.00') // aqui verificamos se realmente ele pegou o camp certo
        })

        //precisamos pegar o id de uma conta para poder fazer a alteração
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                    data_transacao: dayjs().format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            method: 'GET',
            url: '/saldo',
            //headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })

    it('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //headers: { Authorization: `JWT ${token}`},
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                method: 'DELETE',
                url: `/transacoes/${res.body[0].id}`,
               // headers: { Authorization: `JWT ${token}` },
            }).its('status').should('be.equal', 204)
        })
    })
})