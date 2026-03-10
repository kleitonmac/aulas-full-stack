package main

import "fmt"

func main() {
	nomes := []string{"Alice", "Bob", "Charlie"} // Cria um slice de strings com três nomes
	for i := 0; i < len(nomes); i++ {            // Loop for tradicional: percorre o slice usando índice
		fmt.Println(nomes[i])                    // Imprime cada elemento do slice "nomes"
	}

	for i := 0; i < 5; i++ {                     // Loop for: inicializa i=0, roda até i<5
		fmt.Println("Valor de i:", i)            // Imprime os valores de i de 0 a 4
	}

	name := []string{"kleiton", "alana", "luzia"} // Cria outro slice de strings com três nomes
	for _, nome := range name {                   // Loop for range: percorre cada elemento do slice
		fmt.Printf("Nome: %s\n", nome)            // Imprime cada nome usando formatação
	}

	var i int                                     // Declara variável i do tipo int, inicializada com 0
	for i < len(nomes) {                          // Loop while-like: roda enquanto i < tamanho do slice
		fmt.Println(nomes[i])                     // Imprime o elemento na posição i do slice "nomes"
		i++                                       // Incrementa i para avançar no slice
	}
}