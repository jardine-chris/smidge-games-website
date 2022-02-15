import { signOut } from "next-auth/react";
import React from "react";

export const NavbarInternalMenuButton = ({ text, onClick }) => {
  return (
    <button
      className="py-2 divide-y hover:text-white hover:bg-orange-600"
      onClick={() => signOut()}
    >
      {text}
    </button>
  );
};
