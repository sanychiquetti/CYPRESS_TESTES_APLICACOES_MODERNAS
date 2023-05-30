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
    ).as('balance')

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
    ).as('accounts')

    cy.intercept('GET', '/extrato/**',

        [
            { "conta": "Conta para movimentacoes", "id": 1640347, "descricao": "Movimentacao para exclusao", "envolvido": "AAA", "observacao": null, "tipo": "DESP", "data_transacao": "2023-05-27T03:00:00.000Z", "data_pagamento": "2023-05-27T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 1751923, "usuario_id": 33439, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta com movimentacao", "id": 1640348, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2023-05-27T03:00:00.000Z", "data_pagamento": "2023-05-27T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 1751924, "usuario_id": 33439, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 1640349, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2023-05-27T03:00:00.000Z", "data_pagamento": "2023-05-27T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 1751925, "usuario_id": 33439, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 1640350, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2023-05-27T03:00:00.000Z", "data_pagamento": "2023-05-27T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 1751925, "usuario_id": 33439, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 1640351, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2023-05-27T03:00:00.000Z", "data_pagamento": "2023-05-27T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 1751925, "usuario_id": 33439, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para extrato", "id": 1640352, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2023-05-27T03:00:00.000Z", "data_pagamento": "2023-05-27T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 1751926, "usuario_id": 33439, "transferencia_id": null, "parcelamento_id": null },
        ],

    )
}
export default buildEnv