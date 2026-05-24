package main

import (
	"fmt"

	"github.com/mganesh135/code-sentinal/services/gateway/cmd/auth"
)

func main() {
	fmt.Println("Hello Gateway")
	auth.Run()
}
