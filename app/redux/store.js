import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import carrinhoReducer from "./features/carrinhoSlice";
import productReducer from "./features/productsSlice";
import userReducer from "./features/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: carrinhoReducer,
  products: productReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"], // Ignora as ações do redux-persist
        ignoredPaths: ["register"], // Ignora o campo `register`
      },
    }),
});

export const persistor = persistStore(store);
