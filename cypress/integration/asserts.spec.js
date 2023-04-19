/// <reference types="cypress" />

// assert são grupos de assertivas
//aqui vamos comparar as de igualdade:
it('Equality', () =>{
   const a = 1

   expect(a).equal(1) // quero comparar que o expect de a seja igual a 1
   expect(a, 'Deveria ser 1').equal(1) // com falha, e exibindo mensagem do erro 
   expect(a).to.be.equal(1) // de forma mais legivel (deveria ser igual)
   expect('a').not.to.be.equal('b')// no caso de querer negar use o not (não deveria ser igual)
})

// *se o teste falhar, ele para a execução, não continuando os demais.

//vamos testar se ela é verdadeira ou não:
it('Truthy', ()=> {
   const a = true //criando a variável e dando o valor a ela de verdadeiro
   const b = null // criando uma variável e dando o valor nulo a ela
   let c // aqui estamos apenas declarando a variável sem dar valor a ela

   expect(a).to.be.true // verificando se o valor da variável é verdadeiro
   expect(true).to.be.true // outra forma de validar se é verdadeiro
   expect(b).to.be.null // verificando se b é nulo
   expect(a).not.to.be.null // verificar que a não é nulo
   expect(c).to.be.undefined // verificando se o c não tem definição.
})

//vamos testar a igualdade de objetos
it('Object Equality', () =>{
   //vamos criar um objetos  con duas propriedades 'a' e 'b'
   const obj = {
      a: 1,
      b: 2
   }
   // vamos verificar  igualdade dos dois objetos:
   expect(obj).equal(obj) // verificando se ele é igual a ele mesmo (podemos usar eq, equals, o to.be. ...)
   expect(obj).to.be.deep.equals({a:1, b:2}) //aqui precisa colocar o deep, para ele comparar os valores internos
   expect(obj).eql({a:1, b:2}) // aqui é a mesma coisa do de cima, apenas uma forma curta de escrever
   expect(obj).include({a:1}) //aqui estamos verificando se dentro de a tem o valor 1
   //expect(obj).include({c: 1}) // ele não vai passar e dizer que esperava ter a propriedade c
   expect(obj).to.have.property('b') //aqui verificamos se tem a propriedade
   expect(obj).to.have.property('b', 2) //aqui quero saber se tem a prop. b e se o valor dela é 2
   expect(obj).to.not.empty // aqui verificamos se ele não está vazio
   expect({}).to.be.empty // um objeto vazio, ele tem que ser vazio
}) 

//podemos fazer assertivas em cima de arrays
it('Arrays', ()=>{
   const arr = [1, 2, 3]

   expect(arr).to.have.members([1, 2 , 3]) // verificar se o arr tem os menbros 1, 2 e 3
   expect(arr).to.include.members([1, 3]) // verificar se a array tem alguns menbros espeficicos
   expect(arr).not.to.be.empty // verificar se não está vazia
   expect([]).to.be.empty // se uma array vazio está vazia
})

//checagem de tipos:
it('Types', () => {
   //vamos criar uma variável com texto e uma com numeros(tipo, string e num)
   const num = 1
   const str = 'String'

   expect(num).to.be.a('number') // se a variável num têm um numero
   expect(str).to.be.a('string') // se a variável str tem um texto (string)
   expect({}).to.be.an('object') // se é um objeto
   expect([]).to.be.an('array') // se é uma array
})

// outros tipos de checagem, agora com string:
it('String', () => {
   const str = 'String de teste'

   expect(str).to.be.equal('String de teste')
   expect(str).to.have.length(15) // comparar o valor da string
   expect(str).to.contains('de') // ver se na string tem a palavra de
   expect(str).to.match(/String/)// match/corresponde
   expect(str).to.match(/teste/) 
   expect(str).to.match(/^String/) // aqui estamos sendo mais específico, se inicia com a palavra String
   expect(str).to.match(/teste$/) // se termina com a palavra teste
   expect(str).to.match(/.{15}/) // se o valor o tamanho dele é 15
   expect(str).to.match(/\w+/) //se só tem letras
   expect(str).to.match(/\D+/) // que não contém números
})

//em relação a números
it('Numeros', () =>{
   const number = 4
   const floatNumber = 6.215

   expect(number).to.be.equal(4)
   expect(number).to.be.above(3) // o número eta acima de 3
   expect(number).to.be.below(7) // o número está abaixo de 7
   expect(floatNumber).to.be.equal(6.215) //se vc sabe o número completo
   expect(floatNumber).to.be.closeTo(6.2, 0.1) // se vc não sabe o número completo, vc solicita que seja próximo de e com a precisão de 0.1 ou 2...
   expect(floatNumber).to.be.above(6) // que seja acima de 6

})