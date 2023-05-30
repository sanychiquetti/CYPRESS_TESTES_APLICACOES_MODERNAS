const buildEnv = () => {
    cy.intercept('POST', '/signin',
        {
            id: 100,
            nome: 'Usuario Falso',
            token: 'Uma string que não deve ser aceita... mas vai'

        }
    ).as('signin')

    cy.intercept('GET', '/saldo',
        [
            {
                conta_id: 9991,
                conta: 'Carteira',
                saldo: '15000.00'
            },
            {
                conta_id: 9992,
                conta: 'Banco',
                saldo: '100000.00'
            }            
        ]
    ).as('saldo')

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
        ]
    ).as('contas')
}
export default buildEnv