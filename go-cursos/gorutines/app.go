package main

import (
	"fmt"
	"time"
)

func numeros() {
	for i := 1; i <= 10; i++ {
		fmt.Printf("%d ", i)
		time.Sleep(time.Millisecond * 230)
	}

func letras() {
	for l := 'a'; l <= 'z'; l++ {
		fmt.Printf("%c ", l)
		time.Sleep(time.Millisecond * 130)
	}
}

func main() {
	go numeros()
	go letras()
	time.Sleep(time.Second * 5)
}

}
