package main

import "fmt"

// Interface que define um documento
type Document interface {
	Doc() string
}

// Struct base
type Pessoa struct {
	Nome   string
	Idade  int
	Status bool
}

// Pessoa Física
type PessoaFisica struct {
	Pessoa
	Nome      string
	Sobrenome string
	CPF       string
}

// Pessoa Jurídica
type PessoaJuridica struct {
	Pessoa
	RazaoSocial string
	CNPJ        string
}

// Função que recebe qualquer tipo que implemente Document
func show(d Document) {
	if pf, ok := d.(PessoaFisica); ok {
		fmt.Println(pf.Sobrenome)
	} else if pj, ok := d.(PessoaJuridica); ok {
		fmt.Println(pj.RazaoSocial)
	} else {
		fmt.Println("Tipo desconhecido")
	}
	fmt.Println(d)
	fmt.Println(d.Doc())
}

// Método String() para PessoaFisica
func (p PessoaFisica) String() string {
	return fmt.Sprintf(
		"Nome Completo: %s %s, Idade: %d, CPF: %s",
		p.Nome,
		p.Sobrenome,
		p.Idade,
		p.CPF,
	)
}

// Método String() para PessoaJuridica
func (pj PessoaJuridica) String() string {
	return fmt.Sprintf(
		"Empresa: %s, Idade: %d, CNPJ: %s",
		pj.RazaoSocial,
		pj.Idade,
		pj.CNPJ,
	)
}

// Implementação da interface Document para PessoaFisica
func (pf PessoaFisica) Doc() string {
	return fmt.Sprintf("Meu CPF é: %s", pf.CPF)
}

// Implementação da interface Document para PessoaJuridica
func (pj PessoaJuridica) Doc() string {
	return fmt.Sprintf("Meu CNPJ é: %s", pj.CNPJ)
}

func main() {

	pf := PessoaFisica{
		Pessoa{Nome: "Kleiton", Idade: 28, Status: true},
		"Luiza",
		"Macedo",
		"123.456.789-00",
	}

	show(pf)
	fmt.Println()

	pj := PessoaJuridica{
		Pessoa{Nome: "Aprenda Golang", Idade: 1, Status: true},
		"Razao Social LTDA",
		"123.456.789/0001-00",
	}

	show(pj)
}
