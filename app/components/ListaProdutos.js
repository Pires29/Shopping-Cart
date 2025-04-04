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
import { MdAddShoppingCart } from "react-icons/md";

export default function ListaProdutos() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();

  /*   const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error); */

  const produtos = useSelector((state) => state.products.products);
  console.log("Produtos agora", produtos)
  const category = useSelector((state) => state.products.filters.category);
  let order = useSelector((state) => state.products.filters.order);
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

  let produtosFiltrados = category && category !== "all"
  ? produtos.filter((produto) => produto.category === category)
  : produtos;

  console.log("Mens clothing", produtosFiltrados);

  /*   const handleOrderChange = (event) => {
    dispatch(setOrder(event.target.value));
    console.log("Order out of slice", event.target.value);
  }; */

  if (order) {
    produtosFiltrados = [...produtosFiltrados].sort((a, b) => {
      return order === "asc" ? b.price - a.price : a.price - b.price;
    });
  }

  if (rating != '') {
    console.log("RATING");
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

  useEffect(() => {
    console.log("PRODUTOS_FILTRADOS", produtosFiltrados)
  }, [produtosFiltrados])

  return (
    <div className="flex justify-center h-screen pt-[92px]">
      <div className="max-w-5xl mx-auto">
        {/* Selects */}
        <div className="flex gap-4 mb-4">
          <CategorySelect />
          <CustomSelect />
        </div>

        {/* Lista de produtos */}
        <div className="grid grid-cols-3 gap-4">
          {produtosFiltrados.map((produto) => (
            <div
              className="flex flex-col gap-2.5 justify-between border border-amber-400 p-5 text-cente"
              key={produto.id}
            >
              <img
                src={produto.image}
                alt={produto.name}
                width={300}
                height={300}
                className="m-auto w-40 h-40 object-contain"
                onClick={() => handleCardClick(produto.id)}
              />
              <div>
                <p>{produto.title}</p>
                {/* <p>{produto.description}</p> */}
              </div>
              <div className="flex flex-col mt-4">
                <div className="flex justify-between">
                  <p>${produto.price}</p>
                  {/*                   <p>{produto.rating.rate}</p> */}
                  <MdAddShoppingCart onClick={() => handleAddToCart(produto)} size={30} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
