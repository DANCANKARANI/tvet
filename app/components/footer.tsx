// components/Footer.js
"use client"
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const links = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "Careers", path: "/careers" },
    { id: 3, label: "Sponsors", path: "/sponsors" },
    { id: 4, label: "Jobs", path: "/jobs" },
    { id: 5, label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-cream text-blue-500 py-8 px-4 mt-8 bottom-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Pentabyte</h2>
          <p>© 2024 Pentabyte. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          {links.map(({ id, label, path }) => (
            <Link key={id} href={path} className="hover:text-blue-700">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-700">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-700">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-blue-700">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
