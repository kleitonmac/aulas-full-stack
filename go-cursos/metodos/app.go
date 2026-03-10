package main // Pacote principal do programa (ponto de entrada)

import "fmt" // Importa o pacote fmt para imprimir no console

// Pessoa é um tipo struct que representa uma pessoa com alguns campos básicos
type Pessoa struct {
    Nome      string // Nome da pessoa
    Sobrenome string // Sobrenome da pessoa
    Idade     uint8  // Idade da pessoa (uint8 vai de 0 a 255)
    Cpf       string // CPF da pessoa como texto
}

// Categoria é um tipo struct que representa uma categoria de produtos
type Categoria struct {
    Nome      string     // Nome da categoria
    Descricao string     // Descrição da categoria
    Pai       *Categoria // Ponteiro para a categoria pai (pode ser nil)
}

// String implementa o fmt.Stringer para *Pessoa
func (p *Pessoa) String() string { // Método que retorna uma representação em string de Pessoa
    return fmt.Sprintf("Olá, meu nome é %s e eu tenho %d anos: %+v", p.Nome, p.Idade, p.Cpf)
}

// Imprimir é um método de Categoria com receiver de ponteiro (*Categoria)
// Ele retorna true se a categoria tiver um pai, false caso contrário
func (c *Categoria) Imprimir() bool {
    return c.Pai != nil // Verifica se o campo Pai não é nil
}

func main() { // Função principal, executada ao rodar o programa
    p := Pessoa{"Kleiton", "Macedo", 28, "123.456.789-00"} // Cria uma instância de Pessoa com valores para os campos
	

    fmt.Printf("Pessoa: %+v\n", p) // Imprime todos os campos de Pessoa com nomes (%+v)
    fmt.Println(p.String())        // Chama o método String explicitamente
    fmt.Println(p)                 // Também usa String() por causa do fmt.Stringer

    c1 := Categoria{ // Cria a categoria pai (sem pai, então Pai fica zero value = nil)
        Nome:      "Eletrônicos",         // Nome da categoria
        Descricao: "Produtos eletrônicos", // Descrição da categoria
        // Pai: nil // Implícito, pois não foi definido
    }

    c2 := Categoria{ // Cria a categoria filha
        Nome:      "Smartphones",            // Nome da categoria
        Descricao: "Celulares e acessórios", // Descrição da categoria
        Pai:       &c1,                      // Define c1 como categoria pai usando ponteiro
    }

    fmt.Printf("Categoria 1: %+v\n", c1) // Imprime c1 com seus campos
    fmt.Printf("Categoria 2: %+v\n", c2) // Imprime c2, mostrando também o campo Pai

    fmt.Println("c1 tem pai?", c1.Imprimir()) // Chama o método Imprimir em c1 (esperado: false)
    fmt.Println("c2 tem pai?", c2.Imprimir()) // Chama o método Imprimir em c2 (esperado: true)
}
