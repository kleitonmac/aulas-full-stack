package main

import "fmt" // importa o pacote fmt usado para imprimir texto no terminal

// Definindo a struct Pessoa (estrutura base)
type Pessoa struct {
	Nome   string // campo Nome do tipo string (representa o nome da pessoa)
	Idade  int    // campo Idade do tipo inteiro
	Status bool   // campo booleano que pode representar ativo/inativo
}

// PessoaFisica usa "embedding" da struct Pessoa (herda os campos dela)
type PessoaFisica struct {
	Pessoa           // embedding: incorpora a struct Pessoa permitindo acessar Nome, Idade e Status diretamente
	Nome      string // novo campo Nome específico da PessoaFisica (isso cria "sombreamento" do Nome da struct Pessoa)
	Sobrenome string // campo Sobrenome da pessoa física
	CPF       string // campo CPF da pessoa física
}

// struct para representar empresa
type PessoaJuridica struct {
	RazaoSocial string // nome legal da empresa
	CNPJ        string // CNPJ da empresa
}

// método String() para formatar a impressão da struct
func (p PessoaFisica) String() string { // receiver p do tipo PessoaFisica (define um método associado a essa struct)
	return fmt.Sprintf( // Sprintf cria e retorna uma string formatada (não imprime diretamente)
		"Nome Completo: %s %s, Idade: %d, CPF: %s", // string de formatação onde %s representa string e %d inteiro
		p.Nome,      // acessa o campo Nome da struct PessoaFisica
		p.Sobrenome, // acessa o campo Sobrenome
		p.Idade,     // acessa Idade herdada da struct Pessoa via embedding
		p.CPF,       // acessa o CPF da pessoa física
	)
}

func main() {

	// criando uma variável p do tipo PessoaFisica
	p := PessoaFisica{
		Pessoa{Nome: "Kleiton", Idade: 28, Status: true}, // inicializa a struct Pessoa embutida
		"Luiza",          // valor atribuído ao campo Nome da PessoaFisica
		"Macedo",         // valor atribuído ao campo Sobrenome
		"123.456.789-00", // valor atribuído ao campo CPF
	}

	fmt.Println(p) // Println detecta automaticamente o método String() e usa ele para formatar a saída
}
