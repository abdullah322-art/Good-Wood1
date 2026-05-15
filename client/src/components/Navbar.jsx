import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'عن الورشة', href: '#about' },
    { name: 'أعمالنا', href: '#projects' },
    { name: 'آراء العملاء', href: '#testimonials' },
    { name: 'اتصل بنا', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
              Good Wood
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-[#0f0a08] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              اطلب استشارة
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#D4AF37]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col py-4 px-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-[#D4AF37] text-[#0f0a08] px-6 py-3 text-center font-bold mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                اطلب استشارة
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
