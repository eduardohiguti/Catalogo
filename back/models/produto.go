package models

type Produto struct {
	ProdutoId int `json:"produtoId"`
	Nome string `json:"nome"`
	Preco float64 `json:"preco"`
	Quantidade int `json:"quantidade"`
}