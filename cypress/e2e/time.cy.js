/// <reference types="cypress"/>

describe('Work with time', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    }) 
    
    it('Going back to the past', () =>{
        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '05/05/2023') //se amanhã vc for rodar esse teste ele não vai passar...

        //por isso vamos usar o clock
        //cy.clock()
        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '31/12/1969') // essa data que ele vi trzercom esse codigo

        //vamos criar uma variável e dizer o dia, mês, hora e segundos que queremos
        const novaData = new Date(1977, 9, 7, 7, 17, 27 ) // veja que coloquei 9 e vira mês 10, devido a começar a contagem no 0
        cy.clock(novaData.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '07/10/1977')
    })


    //agora vamos avançar no tempo conforme a necessidade, se eu preciso ficar avançando no tempo
    it.only('Tick Goes to the future', ()=> {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '1685') // aqui ele vai pegar apenas no momento do click 
        cy.get('#resultado > span').invoke('text').then( t =>{
            const number = parseInt(t)
            cy.wrap(number).should('be.gt', 168231675329) //aqui estamos pedindo para pegar o texto e validar que o texto deve se maoir que o valor que queremos validar       
        })
        
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then( t =>{
            const number = parseInt(t)
            cy.wrap(number).should('lte', 0)
        })

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then( t =>{
            const number = parseInt(t)
            cy.wrap(number).should('gte', 5000)
        })
    })
})