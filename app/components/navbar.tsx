// components/Navbar.js
"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image"
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);


  const links = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "Careers", path: "/career" },
    { id: 3, label: "Sponsors", path: "/sponsors" },
    { id: 4, label: "Courses", path: "/courses" },
    { id: 5, label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-cream text-blue-500 h-40 flex items-center justify-between px-6 fixed top-0 w-full shadow-md  z-50">
      <div className="text-2xl font-bold">
        <Link href="/">
        <Image src="/logo.jpg" width={80} height={40} alt="Logo" />

        </Link>
      </div>
      <ul className="hidden md:flex space-x-6">
        {links.map(({ id, label, path }) => (
          <li key={id}>
            <Link href={path} className="hover:text-gray-300">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div
        className="md:hidden cursor-pointer text-2xl"
        onClick={() => setNavOpen(!navOpen)}
      >
        {navOpen ? <FaTimes /> : <FaBars />}
      </div>
      {navOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white">
          {links.map(({ id, label, path }) => (
            <li key={id} className="py-2 px-4">
              <Link href={path}>{label}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
