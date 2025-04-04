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
import { IoMdClose } from "react-icons/io";

export default function Carrinho() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const userID = user.uid;

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
  };

  const handleOnChange = (id, quantity) => {
    console.log("Changed");
    console.log("AQUI", id);
    dispatch(setQuantity({ userID, id, quantity: Number(quantity) }));
  };

  useEffect(() => {
    console.log("Carrinho:", cart);
  }, [cart]);

  useEffect(() => {
    console.log("User ID", cart[userID]);
  }, [userID]);

  useEffect(() => {
    console.log("User Real", user);
  }, [user]);

  const price = cart[userID]?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalPrice = price.toFixed(2);

  console.log("Total Price:", totalPrice);

  return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex gap-8 w-3/4">
          <div className="flex-1">
            <h1 className="text-2xl">Carrinho</h1>
            {cart[userID] && cart[userID].length > 0 ? (
              cart[userID].map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between my-5" key={item.id}>
                    <div className="flex">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className=""
                      />
                      <div className="ms-3">
                        <p className="font-medium">{item.title}</p>
                        <p className="capitalize text-gray-400">
                          {item.category}
                        </p>
                        <select
                          value={item.quantity} // ...force the select's value to match the state variable...
                          onChange={(e) =>
                            handleOnChange(item.id, e.target.value)
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>
                    </div>
                    <h2>{item.price * item.quantity}€</h2>
                    {/* <IoMdClose
                    onClick={() => handleRemoveFromCart(item)}
                    className="cursor-pointer"
                  /> */}
                  </div>
                  <hr></hr>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Não há itens no carrinho.</p>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl">Checkout</h1>
            <div className="flex justify-between mt-5">
              <p>Subtotal</p>
              <p>{totalPrice}€</p>
            </div>
            <div className="flex justify-between mt-3">
              <p>Shipping</p>
              <p>0€</p>
            </div>
            <hr className="mt-3"></hr>
            <div className="flex justify-between mt-3">
              <p>Total</p>
              <p>{totalPrice}€</p>
            </div>
            <hr className="mt-3"></hr>
            <button className="bg-black text-white p-5 rounded-lg mt-6">
              Checkout
            </button>
          </div>
          {/*       <button
        className="border border-red-500"
        onClick={() => handleDeleteCart()}
      >
        Apagar
      </button> */}
          {/* Aqui vai o conteúdo da sua página do carrinho */}
        </div>
      </div>
  );
}
