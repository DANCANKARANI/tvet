"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const router = useRouter();

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let newGreeting = hour < 12 ? "Good morning," : hour < 18 ? "Good afternoon," : "Good evening,";
      setGreeting(newGreeting);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <nav className="bg-cream text-blue-500 h-40 flex items-center px-6 fixed top-0 w-full shadow-md z-50">
      <div className="text-2xl font-bold">
        <Link href="/" aria-label="Home">
          <Image src="/logo.jpg" width={80} height={40} alt="Logo" priority={true} />
        </Link>
      </div>

      <ul className="hidden md:flex space-x-6 mx-auto">
        {links.map(({ id, label, path }) => (
          <li key={id}>
            <Link href={path} className="hover:text-gray-300">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ml-auto flex items-center space-x-4">
        <h2 className="hidden md:block">{greeting} {name + "!"}</h2>

        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-1 focus:outline-none"
            aria-label="Profile menu"
          >
            <FaUserCircle className="text-2xl text-blue-500" />
            <span className="hidden md:inline text-blue-500">Profile</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link 
                href="/profile" 
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setProfileOpen(false)}
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden cursor-pointer text-2xl ml-4" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation">
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
          <li className="py-2 px-4 w-full text-center ">
            <Link href="/profile" onClick={() => setNavOpen(false)}>
              My Profile
            </Link>
          </li>
          <li className="py-2 px-4 w-full text-center">
            <button onClick={handleLogout} className="flex items-center justify-center w-full">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
