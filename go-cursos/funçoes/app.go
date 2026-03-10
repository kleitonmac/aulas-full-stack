package main

import (
	"fmt"     // pacote para imprimir na tela
	"strconv" // pacote para converter string em número
)

// função que recebe um nome e imprime uma saudação
func hello(nome string) { 
	fmt.Println("Olá", nome ,"!") // imprime "Olá <nome>!"
}

// função que recebe dois inteiros e retorna a soma deles
func sum(a, b int) int { 
	return a + b // retorna a soma de a e b
}

// função que recebe um inteiro e uma string, converte a string para inteiro e retorna a subtração
func convertAndSub(a int, b string) (total int, err error) { 
	i, err := strconv.Atoi(b) // tenta converter b para inteiro
	if err != nil { 
		return 0, err // se der erro na conversão, retorna 0 e o erro
	}
	total = a - i // faz a subtração se a conversão deu certo
	return        // retorna total e err (err será nil se não houve erro)
}

// função que recebe um inteiro e uma string, converte a string para inteiro e retorna a soma
// aqui o erro da conversão é ignorado com "_"
func convertAndSum(a int, b string) int { 
	i, _ := strconv.Atoi(b) // converte b para inteiro e ignora erro
	return a + i            // retorna a soma de a com i
}

func main() {
	hello("Kleiton") // chama a função hello passando "Kleiton"
	fmt.Println("A soma de 10 + 20 é:", sum(10, 20)) // imprime resultado da soma
	fmt.Println("A soma de texto e numero:", convertAndSum(10, "20")) // soma 10 com string "20"
	
	total, err := convertAndSub(10, "20") // tenta subtrair 10 - "20"
	fmt.Println("A subtração de texto e numero:", total, "Erro:", err) // imprime resultado e erro
}