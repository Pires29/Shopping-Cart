"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  setQuantity,
  clearCart,
} from "../redux/features/carrinhoSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function Carrinho() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const userID = user.uid

  const [itemQuantity, setItemQuantity] = useState(0);
  // Acessando o estado do carrinho usando o useSelector
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  console.log("User Carrinho", cart);

  useEffect(() => {
    if (!user) {
      console.log("Não tás logado");
      router.push("/signup");
    }
  }, [user, router]);

  const handleRemoveFromCart = (prop) => {
    console.log("Clicou no botão Remove");

    dispatch(removeFromCart({ userID: userID, item: prop })); // Adiciona o produto ao carrinho
  };

  const handleDeleteCart = () => {
    dispatch(clearCart());
  }

  const handleOnChange = (id, quantity) => {
    console.log("Changed");
    dispatch(setQuantity({ id, quantity: Number(quantity) }));
  };

  useEffect(() => {
    console.log("Carrinho:", cart);
  }, [cart]);

  useEffect(() => {
    console.log("User ID", cart[userID])
  }, [userID])

  useEffect(() => {
    console.log("User Real", user)
  }, [user])

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cart[userID] && cart[userID].length > 0 ? (
        cart[userID].map((item) => (
          <div key={item.id}>
            <h1>Produto:</h1>
            <h1>{item.name}</h1>
            <h2>{item.price}</h2>
            <p className="text-blue-600">{item.quantity}</p>
            <button
              className="border border-red-500"
              onClick={() => handleRemoveFromCart(item)}
            >
              Remover do Carrinho
            </button>
            <select
              value={item.quantity} // ...force the select's value to match the state variable...
              onChange={(e) => handleOnChange(item.id, e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Não há itens no carrinho.</p>
      )}
      <button
        className="border border-red-500"
        onClick={() => handleDeleteCart()}
      >
        Apagar
      </button>
      {/* Aqui vai o conteúdo da sua página do carrinho */}
    </div>
  );
}
