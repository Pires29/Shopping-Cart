"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaRegUser } from "react-icons/fa";

export default function Card({info, onClick}) {

    useEffect(() => {
        console.log("INFO", info)
    }, [info])
  return (
    <div onClick={onClick} className="mt-10">
      <div className="text-white bg-blue-300 rounded-sm p-6 h-36">
        <div className="flex items-center">
          <FaRegUser />
          <h1 className="ms-3">{info.title}</h1>
        </div>
        <p>{info.description}</p>
      </div>
    </div>
  );
}
