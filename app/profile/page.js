"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profileNoUser from "@/app/assets/images/no-image.png";
import UpdateUser from "@/components/profile/UpdateUser";
import Card from "../../components/profile/Card";
import PersonalInfo from "@/components/profile/PersonalInfo";

// Dados dos cards
const CardInfo = [
  {
    title: "Dados pessoais 1",
    description: "Aqui podes ver os teus dados 1",
  },
  {
    title: "Dados pessoais 2",
    description: "Aqui podes ver os teus dados 2",
  },
  {
    title: "Dados pessoais 3",
    description: "Aqui podes ver os teus dados 3",
  },
  {
    title: "Dados pessoais 4",
    description: "Aqui podes ver os teus dados 4",
  },
  {
    title: "Dados pessoais 5",
    description: "Aqui podes ver os teus dados 5",
  },
  {
    title: "Dados pessoais 6",
    description: "Aqui podes ver os teus dados 6",
  },
];

export default function Profile() {
  const [showProfile, setShowProfile] = useState(true);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log("User Profile:", user);
    console.log("User EMAIL:", user.email);
  }, [user]);

  const handleCardClick = () => {
    console.log("CLICOU CARD");
    setShowProfile(false);
  };

  return (
    <div className="w-full flex justify-center">
      {" "}
      {/* Centraliza todo o conteúdo da página */}
      <div className="w-2/3">
        {" "}
        {/* Aplica 25% de largura ao componente */}
        <div className="my-[7rem]">
          <h1 className="text-center">PROFILE</h1>
          {showProfile ? (
            <div>
              <UpdateUser />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CardInfo.map((info, index) => (
                <Card onClick={handleCardClick} key={index} info={info} />
              ))}
            </div>
            </div>
          ) : (
            <div>
            <PersonalInfo email={user?.email}/>
            <button onClick={() => setShowProfile(true)}>X</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
