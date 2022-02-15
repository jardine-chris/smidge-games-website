import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { MdLogin, MdLogout, MdMenu } from "react-icons/md";
import Image from "next/image";
import { NavbarInternalMenuButton } from "./NavbarInternalMenuButton";

export const Navbar = () => {
  const { data: session } = useSession();
  const userAvatar = session && session.user.image;

  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkOutsideClick = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkOutsideClick);

    return () => {
      document.removeEventListener("mousedown", checkOutsideClick);
    };
  });

  return (
    <nav className="grid items-center h-16 grid-cols-3 px-2 text-white bg-black">
      <button
        className="flex items-center justify-center w-12 h-12 text-3xl bg-black border rounded border-zinc-300/30 hover:bg-zinc-800 hover:text-orange-600"
        onClick={() => {
            session !== null ? signIn() : signUp();
        }}
      >
        <MdMenu />
      </button>
      <h1 className="justify-self-center">Smidge Games</h1>
      {session === null ? (
        <button
          className="flex items-center justify-center w-12 h-12 text-3xl bg-black border rounded justify-self-end border-zinc-300/30 hover:bg-zinc-800 hover:text-orange-600"
          onClick={() => signIn()}
        >
          <MdLogin />
        </button>
      ) : (
        <button
          className="w-12 h-12 overflow-hidden rounded-full hover:brightness-110 justify-self-end"
          ref={ref}
          onClick={() => setIsMenuOpen((oldState) => !oldState)}
        >
          <img src={userAvatar} alt="Photo of the logged in user." />
        </button>
      )}
      {isMenuOpen && (
        <div className="absolute right-0 grid w-64 grid-cols-1 divide-y divide-zinc-600/70 border-zinc-700 top-16 bg-zinc-800">
          <NavbarInternalMenuButton text="Profile" />
          <button
            className="py-2 divide-y hover:text-white hover:bg-orange-600"
            ref={ref}
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};
