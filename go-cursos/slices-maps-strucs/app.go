package main

import "fmt"

type Pessoa struct { // struct = tipo personalizado que agrupa dados relacionados
	Nome      string // nome da pessoa
	Sobrenome string // sobrenome da pessoa
	Idade     uint8  // idade (uint8 = número de 0 até 255)
	Status    bool   // status verdadeiro ou falso
}

func main() {

	nomes := make([]string, 0, 5) // cria um slice vazio de string com capacidade para 5 elementos
	fmt.Println(nomes, len(nomes), cap(nomes)) // mostra o slice, tamanho atual (len) e capacidade (cap)

	nomes = append(nomes, "Kleiton", "Maria", "João") // adiciona elementos ao slice
	fmt.Println(nomes, len(nomes), cap(nomes)) // imprime o slice atualizado

	idades := make(map[string]uint8) // cria um map onde a chave é string e o valor é uint8

	idades["Kleisson"] = 25 // adiciona chave "Kleisson" com valor 25
	idades["Alana"] = 33    // adiciona chave "Alana" com valor 33
	idades["Keila"] = 45    // adiciona chave "Keila" com valor 45

	fmt.Println(idades) // imprime todo o mapa

	val, ok := idades["Marta"] // tenta buscar a chave "Marta" no mapa

	if ok { // se a chave existir
		fmt.Printf("A idade é %d\n", val) // imprime o valor encontrado
	} else { // se a chave não existir
		fmt.Println("Marta não encontrada no mapa") // mensagem informando que não existe
	}

	p := Pessoa{ // criando uma variável do tipo Pessoa
		Nome:      "Kleiton", // atribuindo nome
		Sobrenome: "Macedo",  // atribuindo sobrenome
		Idade:     28,        // atribuindo idade
		Status:    true,      // atribuindo status
	}

	fmt.Printf("Pessoa: %+v\n", p) // %+v mostra os nomes dos campos da struct junto com os valores
}