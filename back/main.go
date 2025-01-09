package main

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"net/http"
	"log"
)

func main() {
	database.InitDB()
	defer database.DB.Close()

	http.HandleFunc("/produtos", listarProdutos)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func listarProdutos(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	rows, err := database.DB.Query("SELECT produto_id, nome, preco, quantidade FROM produtos")
	if err != nil {
		http.Error(w, "Erro ao buscar produtos", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var produtos []models.Produto
	for rows.Next() {
		var produto models.Produto
		err := rows.Scan(&produto.ProdutoId, &produto.Nome, &produto.Preco, &produto.Quantidade)
		if err != nil {
			http.Error(w, "Erro ao processar produtos", http.StatusInternalServerError)
			return
		}
		produtos = append(produtos, produto)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(produtos)
}