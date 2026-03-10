package main

import "fmt" // importa o pacote fmt para impressão no terminal

// Definindo a struct Pessoa (estrutura base)
type Pessoa struct {
	Nome   string // campo Nome do tipo string
	Idade  int    // campo Idade do tipo inteiro
	Status bool   // campo Status do tipo booleano (true ou false)
}

// PessoaFisica usa "embedding" da struct Pessoa (herda os campos dela)
type PessoaFisica struct {
	Pessoa           // embedding da struct Pessoa (permite acessar Nome, Idade e Status diretamente)
	Nome      string // novo campo Nome específico da PessoaFisica (sombreamento do Nome da struct Pessoa)
	Sobrenome string // campo Sobrenome da pessoa
	CPF       string // campo CPF da pessoa física
}

// struct para representar empresa
type PessoaJuridica struct {
	RazaoSocial string // nome legal da empresa
	CNPJ        string // CNPJ da empresa
}

// método String() para formatar a impressão da struct
func (p PessoaFisica) String() string { // receiver p do tipo PessoaFisica
	return fmt.Sprintf( // Sprintf cria uma string formatada
		"Nome Completo: %s %s, Idade: %d, CPF: %s", // string de formatação
		p.Nome, // acessa o Nome que está dentro da struct PessoaFisica (sombreamento do Nome da struct Pessoa)
		p.Sobrenome,   // acessa o Sobrenome da struct PessoaFisica
		p.Idade,       // Idade vem da struct Pessoa embutida
		p.CPF,         // CPF da pessoa física
	)
}

func main() {

	// criando uma variável p do tipo PessoaFisica
	p := PessoaFisica{
		Pessoa{Nome: "Kleiton", Idade: 28, Status: true}, // inicializa a struct Pessoa embutida
		"Luiza",             // valor do campo Nome da PessoaFisica
		"Macedo",            // valor do campo Sobrenome
		"123.456.789-00",    // valor do campo CPF
	}

	fmt.Println(p) // Println detecta o método String() e imprime o resultado formatado
}