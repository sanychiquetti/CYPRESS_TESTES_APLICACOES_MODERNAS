it('nada agora', function(){})

//criando uma function de forma simples:
//function soma(a, b){
//   return a + b;
//}

//criando uma function com variavél:
//const soma = function(a, b){
//   return a + b
//}

//Criando uma arrow function básica:
//const soma = (a, b)=>{
//   returna + b
//}

// Arrow function com 1 parâmetro:
// const soma = (a) => a + a 

// ou ainda:
//const soma = a => a + a

// ou ignorano parametros:
// const soma = () => 5 + 5

//Criando uma arrow function mais enxuta:
const soma = (a, b) => a + b 

console.log(soma(1, 4))

// aqui ele mostra o contexto no console
it('a function test...', function(){
   console.log('Function', this)
})

// aqui ele nao mostra o contexto, fica undefine
it('a arrow test...', () => {
   console.log('Arrow', this)
})
