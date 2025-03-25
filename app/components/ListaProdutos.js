"use client";
import productImage from "../assets/images/image.png";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { addToCart } from "../redux/features/carrinhoSlice"; // Certifique-se de que o caminho está correto
import {
  fetchProducts,
  setCategory,
  setOrder,
} from "../redux/features/productsSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomSelect from "./Select";
import CategorySelect from "./CategorySelect";

export default function ListaProdutos() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();

/*   const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error); */

  const produtos = useSelector((state) => state.products.products);
  const category = useSelector((state) => state.products.filters.category);
  const order = useSelector((state) => state.products.filters.order);
  const rating = useSelector((state) => state.products.filters.rating);

  useEffect(() => {
      // Se a lista de produtos estiver vazia
      dispatch(fetchProducts()); // Faz o fetch apenas se não houver produtos no estado
      console.log("Fez o fetch");

  }, []);

  const handleAddToCart = (produto) => {
    console.log("Clicou no botão");

    if (!user) {
      console.log(
        "Usuário não autenticado. Não é possível adicionar ao carrinho."
      );
      return;
    }
    dispatch(addToCart({ userID: user.uid, item: produto })); // Adiciona o produto ao carrinho
  };

  const handleCardClick = (id) => {
    console.log("Clicou");
    router.push(`/produto/${id}`);
  };

  /*   const handleSelectChange = (event) => {
    dispatch(setCategory(event.target.value));
    console.log("event.target.value", event.target.value);
  }; */

  let produtosFiltrados = category
    ? produtos.filter((produto) => produto.category === category)
    : produtos;

  console.log("Mens clothing", produtosFiltrados);

  /*   const handleOrderChange = (event) => {
    dispatch(setOrder(event.target.value));
    console.log("Order out of slice", event.target.value);
  }; */

  if (order) {
    produtosFiltrados = [...produtosFiltrados].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
  }

  if (rating) {
    console.log("Chamou");
    produtosFiltrados = [...produtosFiltrados].sort((a, b) => {
      return b.rating.rate - a.rating.rate;
    });
  }

/* if (loading && !error) {
    console.log("Loading state:", loading);
    return <p>Loading...</p>;
  } */
/* 
  if (!loading) {
    console.log("Loading over:", loading);
  }

  if (error) {
    return (
      <p>
        Ocorreu um erro ao carregar os produtos. Por favor, tente novamente mais
        tarde.
      </p>
    );
  } */
  useEffect(() => {
    if (user) {
      // Verifica se o user não é null
      console.log("Log User Lista Produtos", user.uid);
    } else {
      console.log("Usuário não autenticado");
    }
  }, [user]);
  /*   const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log("Data", data);
    dispatch(setProducts(data));
  };

  useEffect(() => {
    fetchData();
  }, []); */

  /* /*   fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => console.log("Data:", data)) 

  console.log("Data", data) */

  return (
    <div className="flex flex-wrap gap-4">
      <h1>Ocorreu</h1>
      <CategorySelect />
      {/*       <select onChange={handleSelectChange} name="categories" id="categories">
        <option value="men's clothing">Men Clothes</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Eletronics</option>
        <option value="women's clothing">Women Clothes</option>
      </select> */}
      <CustomSelect />
      {/*       <select onChange={handleOrderChange} name="order" id="order">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select> */}
      {
        produtosFiltrados.map((produto) => (
          <div
            className="w-1/4 border border-amber-400 p-5 mb-3 text-center"
            key={produto.id}
          >
            {/* Usando o componente Image para exibir a imagem do produto */}
            <img
              src={produto.image}
              alt={produto.name}
              width={300}
              height={300}
              className="object-cover"
              onClick={() => handleCardClick(produto.id)}
            />
            <div className="flex flex-co">
              <div>
                <p>{produto.title}</p>
                <p>{produto.description}</p>
                <button
                  className="border border-amber-500"
                  onClick={() => handleAddToCart(produto)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
              <div>
                <p>${produto.price}</p>
                <p>{produto.rating.rate}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
