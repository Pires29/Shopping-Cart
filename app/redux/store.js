import { configureStore } from "@reduxjs/toolkit";
import productReducer from './features/productsSlice';
import cartReducer from './features/carrinhoSlice';
import userReducer from './features/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuração do redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'cart'], // Especifica quais reducers serão persistidos
};

// Envolvendo os reducers com persistReducer
const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const createStore = () => {
  const store = configureStore({
    reducer: {
      products: persistedProductReducer,
      cart: persistedCartReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

// Criar a store e o persistor para uso global
export const { store, persistor } = createStore();
