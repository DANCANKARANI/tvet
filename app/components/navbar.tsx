// components/Navbar.js
"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
  name: string;
}

const links = [
  { id: 1, label: "Home", path: "/home" },
  { id: 2, label: "Careers", path: "/career" },
  { id: 3, label: "Sponsors", path: "/sponsors" },
  { id: 4, label: "Courses", path: "/courses" },
  { id: 5, label: "Contact", path: "/contactus" },
  { id: 6, label: "Payment Tracking", path: "/track-payment" }
];

const Navbar: React.FC<NavbarProps> = ({ name }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-cream text-blue-500 h-40 flex items-center justify-between px-6 fixed top-0 w-full shadow-md z-50">
      <div className="text-2xl font-bold">
        <Link href="/" aria-label="Home">
          <Image src="/logo.jpg" width={80} height={40} alt="Logo" priority={true} />
        </Link>
      </div>
      <div>
        <h2>Welcome {name} here</h2>
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
        aria-label="Toggle navigation"
      >
        {navOpen ? <FaTimes /> : <FaBars />}
      </div>
      {navOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full h-screen bg-gray-800 text-white flex flex-col items-center">
          {links.map(({ id, label, path }) => (
            <li key={id} className="py-2 px-4 w-full text-center">
              <Link href={path} onClick={() => setNavOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;