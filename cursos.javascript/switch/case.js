/*
      =========================================================
      ESTRUTURA SWITCH / CASE EM JAVASCRIPT
      =========================================================
      O switch é usado quando precisamos comparar
      um mesmo valor com várias possibilidades.
      */

// Entrada de dados
// O prompt retorna STRING
var parametro = prompt('Digite um número');

/*
---------------------------------------------------------
CONVERSÃO DE TIPO
---------------------------------------------------------
Usamos parseInt para converter a string em número,
pois o switch compara usando igualdade estrita (===).
*/

switch (parseInt(parametro)) {

    case 1:
        // Executa se o valor for exatamente 1
        document.write('Parâmetro 1');
        break;
    /*
    O break interrompe o switch.
    Sem ele, o código continuaria
    executando os próximos cases
    (comportamento chamado de "fall-through").
    */

    case 2:
        // Executa se o valor for exatamente 2
        document.write('Parâmetro 2');
        break;

    default:
        /*
        Executa quando nenhum case
        corresponde ao valor informado.
        */
        document.write('Valor padrão (default)');
}

/*
---------------------------------------------------------
OBSERVAÇÃO IMPORTANTE
---------------------------------------------------------
Sem o parseInt, o valor do prompt seria string.
Exemplo:
switch(parametro) {
    case "1":
        ...
}

O tipo precisa ser compatível com o case.
*/