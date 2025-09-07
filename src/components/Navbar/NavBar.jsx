import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/new logo.svg";

const navItems = [
    {
        id: "home",
        title: "Home",
        path: "/"
    },
    {
        id: "about",
        title: "About",
        path: "/about"
    },
    {
        id: "blog",
        title: "Blog",
        path: "/blog"
    },
    {
        id: "mentors",
        title: "Mentors",
        path: "/mentors"
    },
    {
        id: "testimonials",
        title: "Testimonials",
        path: "/testimonials"
    }
];

const NavBar = ({ openModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
   <nav className="relative z-50">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="container py-4 sm:py-6 flex justify-between items-center">
            <Link to="/">
                <img src={Logo} alt="YesGrant" className="h-16 sm:h-16 md:h-20" />
            </Link>
            <div className="hidden lg:block">
                <ul className="flex items-center gap-3">
                    {navItems.map((menu) => (
                        <li key={menu.id}>
                            {menu.path.startsWith('#') ? (
                                <a href={menu.path} className="inline-block py-2 px-3 hover:text-primary relative group">
                                    {menu.title}
                                </a>
                            ) : (
                                <Link to={menu.path} className="inline-block py-2 px-3 hover:text-primary relative group">
                                    {menu.title}
                                </Link>
                            )}
                        </li>
                    ))}
                    <button 
                        onClick={() => openModal('journey')} 
                        className="primaryBtn"
                    >
                        Start Journey
                    </button>
                </ul>
            </div>
            <div className="lg:hidden">
                <button 
                    onClick={toggleMobileMenu}
                    className="text-3xl sm:text-4xl focus:outline-none z-50 relative"
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
                </button>
            </div>
        </motion.div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 z-50"
                style={{ zIndex: 9999 }}
            >
                <ul className="container py-4 space-y-2">
                    {navItems.map((menu) => (
                        <li key={menu.id}>
                            {menu.path.startsWith('#') ? (
                                <a 
                                    href={menu.path} 
                                    className="block py-3 px-4 hover:bg-gray-50 hover:text-primary transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    {menu.title}
                                </a>
                            ) : (
                                <Link 
                                    to={menu.path} 
                                    className="block py-3 px-4 hover:bg-gray-50 hover:text-primary transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    {menu.title}
                                </Link>
                            )}
                        </li>
                    ))}
                    <li className="pt-2">
                        <button 
                            onClick={() => {
                                openModal('journey');
                                closeMobileMenu();
                            }} 
                            className="w-full primaryBtn"
                        >
                            Start Journey
                        </button>
                    </li>
                </ul>
            </motion.div>
        )}
   </nav>
  )
}

export default NavBar