"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import profileNoUser from "@/app/assets/images/no-image.png";
import { BiSolidPencil } from "react-icons/bi";

export default function UpdateUser() {
  const [photoURL, setPhotoURL] = useState(profileNoUser);
  const user = useSelector((state) => state.user.user);

  const displayName = useSelector((state) => state.user.displayName);


  useEffect(() => {
    console.log("User Profile DISPLAY NAME", displayName);
  }, [user]);

  return (
    <div className="flex">
      <Image
        className="rounded-full"
        src={photoURL}
        height={100}
        width={100}
        alt="no user"
      />
      {user && (
        <div className="ms-5">
          <h1>Hello {displayName}!</h1>
          <h1>{user.email}</h1>
        </div>
      )}
    </div>
  );
}
