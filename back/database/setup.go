package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./produtos.db")
	if err != nil {
		log.Fatalf("Erro ao conectar ao banco de dados: %v", err)
	}

	criarTabela()
}

func criarTabela() {
	query := `
		CREATE TABLE IF NOT EXISTS produtos (
			produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
			nome TEXT NOT NULL,
			preco REAL NOT NULL,
			quantidade INTEGER NOT NULL
		);`
		_, err := DB.Exec(query)
		if err != nil {
			log.Fatalf("Erro ao criar tabela: %v", err)
		}
}