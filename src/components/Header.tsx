import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import logo from "@/assets/loyal-liquor-logo.png";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-charcoal-deep/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-8 py-6 flex items-center justify-between">
        {/* Left Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            {isHomePage ? (
              <a
                href="#collections"
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                Collections
              </a>
            ) : (
              <Link
                to="/collections"
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                Collections
              </Link>
            )}
          </li>
          {isHomePage && (
            <li>
              <a
                href="#story"
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                Our Story
              </a>
            </li>
          )}
        </ul>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img
            src={logo}
            alt="Loyal Liquor"
            className="w-14 h-14 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Right Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {isHomePage && (
            <>
              <li>
                <a
                  href="#philosophy"
                  className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300"
                >
                  Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </>
          )}
          <li>
            <Link
              to="/cart"
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="text-xs text-gold">{itemCount}</span>
              )}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            to="/cart"
            className="text-gold relative"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-charcoal-deep text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="text-gold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
