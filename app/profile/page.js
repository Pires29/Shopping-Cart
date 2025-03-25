"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function Carrinho() {

    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        console.log("User Profile:", user)
    }, [user])



  return (
    <div>
        <h1>AQUI É O PERFILE</h1>
        {user && (
            <div>
                <h1>{user.email}</h1>
            </div>
        )}
    </div>
  );
}
