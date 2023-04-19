/// <reference types="cypress" />

//estrutura de test:
it ('A external test...', () => {
   //aqui dentro os testes
})

/*outra estrutura de test, que é o describe, onde ele agrupa os testes
describe('Should group test...', () =>{
   it ('A internal test...', () => {
      //aqui dentro os testes
   })
   //se colocar o only, ele vai executar apenas esse test, se 
   //tiver mais de um ony, ele executa o último.
   it.only('A internal test...', () => {
      //aqui dentro os testes
   })
})*/

//pode ter mais grupos no describe
describe('Should group tests...',() =>{
   describe('Should group more specific tests...', () =>{
      //para não rodar um test, colocar o skip:
      it.skip('A specific test...', () => {
         //aqui dentro os testes
      })
   })

   describe('Should group more specific tests...', () =>{
      it ('A specific test...', () => {
         //aqui dentro os testes
      })
   })

   it('A internal test...', () => {
      //aqui dentro os testes
   })
})