///<reference types='cypress'/>

//se quisermos testar objeto, temos que encapsular com o wrap, pois os comando do cypress, não são lidos pelo obj
describe('Helpers...', () =>{
   it('Wrap', () =>{
      const obj = {nome: 'Sany', idade: 45}
      expect(obj).to.have.property('nome')
      cy.wrap(obj).should('have.property', 'nome')//veja o shold é do cypress


      //agora vamos entender melhor:
      cy.visit('https://wcaquino.me/cypress/componentes.html')
      //cy.get('#formNome').type('Funciona?') //aqui vai funcionar, mas e se fizer com o promise?
      cy.get('#formNome').then($el =>{
         cy.wrap($el).type('funciona via cypress!')
      })
   })
      //se tivermos algum promisse, não relacionado ao cypress, queira utilizar com meus scripts
   it('Wrap with promisse', () =>{
      const promise =  new Promise((resolve, reject) =>{
         setTimeout(() =>{
            resolve(10)
         }, 500)
      })
      cy.visit('https://wcaquino.me/cypress/componentes.html')
      cy.get('#buttonSimple').then(()=> console.log('Encontrei o primeiro botão'))
      cy.wrap(promise).then(ret => console.log(ret)) // aqui estou pedindo para resolve a promise, imprimindo o numero, mas encapsulndo ela para que ela seja executada na sequência dos script
      cy.get('#buttonList').then(()=> console.log('Encontrei o segundo botão'))
   })

   // exemplo com it´s, ele dá uma propriedade que está na cadeia do cypress
   it.only('Its...', () =>{
      const obj = { name: 'Cler', age: 46}
      cy.wrap(obj).should('have.property', 'name', 'Cler')
      //agora vamos usar o it´s, ele vai pegar o obj completo, e depois apenas o obj name e faz a assertiva nela:
      cy.wrap(obj).its('name').should('be.equal', 'Cler')

      //vamos deixar mais complexo:
      const obj2 = {name: 'Sany', age: 45, adress:{rua: 'Herval'} }
      cy.wrap(obj2).its('adress').should('have.property', 'rua')
      cy.wrap(obj2).its('adress.rua').should('contain', 'Herval')

      //trazendo um pouco mais para o us do cypress mesmo:
      cy.visit('https://wcaquino.me/cypress/componentes.html')
      cy.title().its('length').should('be.equal', 20)//como o titulo é uma string usamos o length
   })

   //vamos ver o metodo invoke - ele trabalha com as funções
   it.only('Invoke...', () =>{
      const getValue = () => 1 //criando uma constante e retornando o valor de 1

      // vamos pegar essa função executar ele utilizando o cypress
      cy.wrap({ nomeqq: getValue}).invoke('nomeqq').should('be.equal', 1)// encapsular com o wrap, e criar um nome para a const, invocar e fazer  assertiva

      // outro exemplo:
      const soma = (a, b) => a + b

      cy.wrap({plus: soma}).invoke('plus', 2, 5).should('be.equal', 7)// devemos passar os valores dos parametros em invoke

      // o que podemos fazer de funções:
      cy.visit('https://wcaquino.me/cypress/componentes.html')
      cy.get('#formNome').invoke('val', 'Texto via invoke') //ideal faer pelo type, não por aqui
      cy.window().invoke('alert', 'Da para ver?') // pelo window consigo executar um script diretamente nele
      cy.get('#resultado') //procurar uma tag que tenha id resultado
         .invoke('html', '<input type="button", value="hacked!"/>') //chamando o metodo html para embutir um html dentro dessa div

   })
})