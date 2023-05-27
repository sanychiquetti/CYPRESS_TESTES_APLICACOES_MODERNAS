/// <reference types="cypress"/>


describe('Should test at a funcional level', () => {
    let token //criando a váriavel token
   

    beforeEach(() => {
        cy.getToken('user', 'passwd')
            .then(tkn => {
                token = tkn // guardando o token dentro da variável token
            })
        cy.resetRest()
    })

    it('Create an account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
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
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            //vamos passar uma query string na url, entao passamos outro atributo chamado qs
            qs: {
                nome: 'Conta para alterar'
            }
        })//.then(res => console.log(res)) //aqui estamos pegando a resposta e imprimindo no console para pegarmos a url da chamada, após isso alteramos o res para o código abaixo:
            .then(res => {
                cy.request({
                    url: `/contas/${res.body[0].id}`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${token}` },
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
            headers: { Authorization: `JWT ${token}` },
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
        const dayjs = require('daysjs')
        cy.getCountByName('Conta para movimentacoes')
            .then(contaId => { // retorno dela vamos chamar de contaId e chamar o metodo
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}` },
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

    })

    it('Should remove a transaction', () => {


    })
})