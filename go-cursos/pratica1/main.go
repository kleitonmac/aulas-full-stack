package main

import "fmt"

func main() {
    // Chamando função para verificar idade
    verificarIdade()

    // Chamando função para par ou ímpar
    parOuImpar()
}

// Função para verificar maioridade
func verificarIdade() {
    var nome string
    var idade int

    fmt.Printf("Digite seu nome: ")
    fmt.Scan(&nome)

    fmt.Printf("Digite sua idade: ")
    fmt.Scan(&idade)

    if idade >= 18 {
        fmt.Printf("Você é maior de idade, %s\n", nome)
    } else {
        fmt.Printf("Você é menor de idade, %s\n", nome)
    }
}

// Função para verificar par ou ímpar
func parOuImpar() {
    var numero int
    fmt.Printf("Digite um número: ")
    fmt.Scan(&numero)

    if numero%2 == 0 {
        fmt.Printf("O número %d é par\n", numero)
    } else {
        fmt.Printf("O número %d é ímpar\n", numero)
    }
}