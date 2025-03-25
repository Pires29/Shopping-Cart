import { useEffect } from "react";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cart: {},
};

const carrinhoSlice = createSlice({
  name: "Carrinho",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { userID , item } = action.payload

      console.log("Payload", action.payload)

      if (!state.cart[userID]) {
        state.cart = { ...state.cart, [userID]: [] };
      }

            const itemExist = state.cart[userID].find(
        (i) => i.id === item.id
      );

      if (itemExist) {
        itemExist.quantity += 1;
      } else {
        state.cart[userID].push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      console.log("SOBE NÉLEEEE")
      const { userID , item } = action.payload
      const itemExist = state.cart[userID].find(
        (i) => i.id === item.id
      );
      console.log("Item Quantity", itemExist.quantity)
      if (itemExist) {
        itemExist.quantity -= 1;
        console.log("SOBE NÉLEEEEE 2", itemExist.quantity)
        if (itemExist.quantity === 0) {
          console.log("Removeu");
          state.cart[userID] = state.cart[userID].filter(
            (i) => i.id !== item.id
          );

          console.log("filter:", state.cart);
        }
      } else {
        console.log("Não existe esse artigo no carrinho!");
      }
    },
    setQuantity(state, action) {
        /* 
          1 - Saber a quantidade que tens no produto
          2 - Alterar a quantidade que tens no produto
          3 - Fazer com que quantidade mude no carrinho
        */

          const { id, quantity} = action.payload
          const itemExist = state.cart.find(
            (item) => item.id === action.payload.id
          );

          if(itemExist){
            itemExist.quantity = quantity
            console.log("Quantidade", quantity)
          }
          
    },
    clearCart (state){
      state.cart = {}
    },
  },
});

export const { addToCart, removeFromCart, setQuantity, clearCart } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
