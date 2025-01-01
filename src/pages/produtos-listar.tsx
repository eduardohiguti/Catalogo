import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "../models/Produto";

function ProdutosListar() {
    const [produto, setProduto] = useState<Produto[]>([]);

    useEffect(() => {
        carregarProdutos();
    }, []); // Corrigido para rodar apenas uma vez ao carregar o componente

    function carregarProdutos() {
        // Substitua a URL pela sua API real
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
            <table className="min-w-full mt-4 table-auto">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Preço</th>
                        <th className="px-4 py-2">Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {produto.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="text-center py-4">Nenhum produto encontrado</td>
                        </tr>
                    ) : (
                        produto.map((produto) => (
                            <tr key={produto.produtoId} className="border-b">
                                <td className="px-4 py-2">{produto.nome}</td>
                                <td className="px-4 py-2">{produto.preco}</td>
                                <td className="px-4 py-2">{produto.quantidade}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProdutosListar;
