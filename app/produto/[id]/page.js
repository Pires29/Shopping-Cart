"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProdutoDetalhes() {
  const { id } = useParams(); // O id pode ser uma string vindo da URL

  useEffect(() => {
    console.log("ID:", id);
  }, [id]);

  const produtos = useSelector((state) => state.products.products);
  console.log("Produtos", produtos);

  // Convertendo o id para número para garantir a comparação correta
  const produto = produtos.find((produto) => produto.id === Number(id));

  useEffect(() => {
    console.log("Este sim é o produto", produto);
  }, [produto]);

  return (
    <div>
      <h1>Produto ID: {id}</h1>
      {produto ? (
        <div>
          <img
            src={produto.image}
            alt={produto.name}
            width={100}
            height={100}
            className="object-cover"
          />
          <p>Nome: {produto.title}</p>
          <p>Preço: ${produto.price}</p>
          <p>Descrição: {produto.description}</p>
        </div>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
}
