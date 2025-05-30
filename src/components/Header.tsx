import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Info, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Camera className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Color Harmony
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/about" label="About" currentPath={location.pathname} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink
              to="/"
              label="Home"
              icon={<Camera className="h-5 w-5" />}
              currentPath={location.pathname}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              to="/about"
              label="About"
              icon={<Info className="h-5 w-5" />}
              currentPath={location.pathname}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

type NavLinkProps = {
  to: string;
  label: string;
  currentPath: string;
};

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath }) => {
  const isActive = to === '/' ? currentPath === to : currentPath.startsWith(to);

  return (
    <Link
      to={to}
      className={`transition-colors duration-200 ${
        isActive
          ? 'text-indigo-600 font-medium'
          : 'text-gray-600 hover:text-indigo-600'
      }`}
    >
      {label}
    </Link>
  );
};

type MobileNavLinkProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
  currentPath: string;
  onClick: () => void;
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  to,
  label,
  icon,
  currentPath,
  onClick,
}) => {
  const isActive = to === '/' ? currentPath === to : currentPath.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-indigo-50 text-indigo-600 font-medium'
          : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Header;