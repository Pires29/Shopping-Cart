'use client'

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './redux/features/carrinhoSlice'; // Certifique-se de que o caminho está correto
import Navbar from './components/Navbar';
import ListaProdutos from './components/ListaProdutos';
import { useEffect } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { signOut } from 'firebase/auth'
import { setUser, clearUser } from "./redux/features/userSlice";


export default function Home() {
  const [user] = useAuthState(auth)
  const dispatch = useDispatch();

    useEffect(() => {
      if (user) {
        // Quando o usuário estiver logado, atualiza o estado no Redux com os dados do usuário
        dispatch(setUser({user}));
        console.log("Vinde", user)
      } else {
        // Se o usuário não estiver logado, reseta o estado
        console.log("Nao vinde");
      }
    }, [user, dispatch]);

    const userR = useSelector((state) => state.user.user);

    useEffect(() => {
      console.log("User:", userR);
    }, [userR]);

    const handleLogout = () => {
      console.log("User antes do sign out:", user)
      signOut(auth)
      console.log("User depois do sign out:", user)
      dispatch(clearUser())
      console.log("User Apagado:", user)
    }

  return (
    <div>
      <Navbar />
      {user && (
        <div>
          <h1>Logado</h1>
        </div>
  )}
      <button onClick={() => handleLogout()}>Log Out</button>
      <ListaProdutos />
    </div>
  );
}
