import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      //await new Promise((resolve) => setTimeout(resolve, 5000));
      //throw new Error("Outra vez nabo");
      console.log("Estás aqui")
      const response = await fetch("https://fakestoreapi.com/products");
/*       if (!response.ok) {
        console.log("Chegou aqui")
        throw new Error("Network response was not ok");
      } */
      console.log("OLHO PEDIDO CARALHO")
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    order: '',
    rating: ''
  }
};
const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    /*     setProducts(state, action) {
      state.products = action.payload;
      console.log("OLHELE", state.products);
    }, */
    setCategory(state, action){
      state.filters.category = action.payload

      console.log("Category:", state.filters.category)
    },
    setOrder (state,action) {
      state.filters.order = action.payload

      console.log("Order", state.filters.order)
    },
    setRating(state, action) {
      state.filters.rating = action.payload

      console.log("Rating", state.filters.rating)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
      console.log("Pending");
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
      console.log("Fullfilled", state.products);
      console.log("Fullfilled", state.error);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log("Error r");
    });
  },
});

export const { setCategory, setOrder, setRating } = productSlice.actions;
export default productSlice.reducer;
