import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "../models/Produto";
import React from "react";

function ProdutosListar() {
    const [produto, setProduto] = useState<Produto[]>([]);

    useEffect(() => {
        carregarProdutos();
    }, []);

    function carregarProdutos() {
        axios.get<Produto[]>("https://api.exemplo.com/produtos")
            .then((resposta) => {
                setProduto(resposta.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar produtos:", err);
            });
    }

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold">Produtos</h1>
            {produto.length === 0 ? (
                <p className="text-center">Nenhum produto encontrado</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {produto.map((produto) => (
                        <div key={produto.produtoId} className="border rounded-lg p-4 shadow-md bg-white">
                            <h2 className="text-lg font-semibold">{produto.nome}</h2>
                            <p className="text-gray-600">Preço: R$ {produto.preco}</p>
                            <p className="text-gray-600">Quantidade: {produto.quantidade}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default ProdutosListar;
