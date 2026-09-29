import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: t("nav.home"), to: "home" },
    { name: t("nav.about"), to: "about" },
    { name: t("nav.skills"), to: "skills" },
    { name: t("nav.experience"), to: "experience" },
    { name: t("nav.projects"), to: "projects" },
    { name: t("nav.achievements"), to: "achievements" },
    { name: t("nav.contact"), to: "contact" },
  ];

  const linkProps = {
    smooth: true,
    duration: 700,
    spy: true,
    offset: -90,
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080812]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div
        className={`container mx-auto px-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Logo */}
        <Link
          to="home"
          {...linkProps}
          className="cursor-pointer flex items-center gap-1 text-2xl font-bold font-poppins group"
        >
          <span className="text-primary group-hover:text-indigo-300 transition-colors">
            Do Thanh Thuy
          </span>

          <span className="text-white group-hover:text-slate-200 transition-colors">
            .dev
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              {...linkProps}
              activeClass="!text-primary"
              className="relative cursor-pointer text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300 py-2"
            >
              {link.name}
            </Link>
          ))}

          <div className="ml-2 pl-5 border-l border-white/10">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/30 transition-all"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-white/[0.06] bg-[#080812]/95 backdrop-blur-2xl"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  {...linkProps}
                  onClick={() => setIsOpen(false)}
                  activeClass="!text-primary !bg-primary/10"
                  className="cursor-pointer text-slate-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex justify-center pt-4 mt-2 border-t border-white/[0.06]">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
