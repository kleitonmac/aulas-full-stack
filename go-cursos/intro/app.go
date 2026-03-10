package main // Pacote principal, todo programa Go começa aqui

import "fmt" // Importa o pacote fmt para imprimir no console

// Variáveis globais (disponíveis em todo o programa)
var(
   nome string   // variável de texto (string), inicia vazia ""
   n1 int        // variável inteira, inicia com 0
   n2 int32  
)    // variável inteira de 32 bits, inicia com 0

func main() { // Função principal, ponto de entrada do programa
    mensagem := "Olá mundo!" // Cria variável local e atribui valor
    fmt.Println(mensagem)    // Imprime o valor da variável mensagem


	var a , b , c int // Declara três variáveis inteiras, todas iniciam com 0
	a, b, c = 10, 20, 30 // Atribui valores 10, 20 e 30 às variáveis a, b e c respectivamente
	fmt.Println("Valores de a, b e c:", a, b, c) // Imprime os valores de a, b e c

    var total int            // Cria variável inteira local, inicia com 0
    total--                  // Decrementa 1 → total passa de 0 para -1
    fmt.Println("O total é:", total+10) // Soma -1 + 10 = 9 e imprime

	var d , e , f = true, 3.14, "Go" // Declara e inicializa variáveis com tipos inferidos: d é bool, e é float64, f é string
	fmt.Println("Valores de d, e e f:", d, e, f) // Imprime os valores de d, e e f

	var x , y = 10, 20
	fmt.Println("Valores de x e y:", x, y) // Imprime os valores de x e y
	
	x ,y = y, x // Troca os valores de x e y usando atribuição múltipla
	fmt.Println("Valores de x e y após troca:", x, y) // Imprime os valores de x e y após a troca

}