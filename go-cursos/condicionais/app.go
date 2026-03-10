package main

import (
	"fmt"
	"log"
	"os"
)

func main() {

	a, b := 22, 21

	if a < b {
		fmt.Println("a é menor que b")
	} else if a > b {
		fmt.Println("a é maior que b")
	} else {
		fmt.Println("a é igual a b")
	}

// o break ja ven e embutido, não precisa ser escrito
switch {
case a < b:
	fmt.Println("a é menor que b")
case a > b:
	fmt.Println("a é maior que b")
default:
	fmt.Println("a é igual a b")
}



	file, err := os.Open("arquivo.txt")
	if err != nil {
		log.Panic(err)
	}
	defer file.Close()

	data := make([]byte, 100)

	if _, err := file.Read(data); err != nil {
		log.Panic(err)
	}

	fmt.Println("Dados lidos do arquivo:", string(data))
}