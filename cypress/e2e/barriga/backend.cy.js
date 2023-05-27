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
            url: 'https://barrigarest.wcaquino.me/contas/1749997',
            method: 'PUT',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta para saldo alterada react'
            }
        }).as('response')

        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Cant Create repeated account', () => {

    })

    it('Should create a transaction', () => {

    })

    it('Should get balance', () => {

    })

    it('Should remove a transaction', () => {


    })
})