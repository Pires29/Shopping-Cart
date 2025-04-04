"use client";
import Image from "next/image";
import profileNoUser from "@/app/assets/images/no-image.png";
import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { setDisplayName } from "@/app/redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function PersonalInfo({ email }) {
    const dispatch = useDispatch();
  //const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState(profileNoUser);
  const [nameValue, setNameValue] = useState("");

  const handleClick = async () => {
    console.log("CLICOU");
    
    // Atualiza o estado displayName
        dispatch(setDisplayName(nameValue));

    // Agora, chama a atualização do perfil
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: nameValue,  // Atualiza com o valor de nameValue
        photoURL: "https://example.com/jane-q-user/profile.jpg", // Pode ser a URL real ou uma dinâmica
      });

      console.log("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o perfil", error);
    }
  };

  return (
    <div className="mt-10 p-6 bg-white shadow-lg rounded-lg w-full mx-auto">
      <div className="flex justify-center mb-4">
        <Image
          className="rounded-full border-4 border-gray-300"
          src={photoURL}
          height={100}
          width={100}
          alt="no user"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <h1>Altere aqui as suas informações pessoais</h1>

        {/* Label e Input para Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            className="w-full border border-gray-300 p-2 rounded-md mt-1"
            type="text"
            placeholder={email}
            disabled
          />
        </div>

        {/* Label e Input para Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Nome
          </label>
          <input
            id="name"
            onChange={(e) => setNameValue(e.target.value)}
            value={nameValue}
            className="w-full border border-gray-300 p-2 rounded-md mt-1"
            type="text"
            placeholder="Digite seu nome..."
          />
        </div>

        {/* Label e Input para Número */}
        <div>
          <label htmlFor="number" className="block text-sm font-semibold text-gray-700">
            Número
          </label>
          <input
            id="number"
            type="number"
            className="w-full border border-gray-300 p-2 rounded-md mt-1"
            placeholder="Digite um número"
          />
        </div>

        {/* Botão Submit */}
        <button
          onClick={handleClick}  // Chama a função handleClick ao clicar
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          type="button"
        >
          Atualizar
        </button>
      </div>
    </div>
  );
}
