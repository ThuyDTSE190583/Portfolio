import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { heroData } from '../Hero/heroData';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 mt-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold font-poppins">
              <span className="text-primary drop-shadow-[0_0_15px_rgba(37,99,235,0.8)]">Do Thanh Thuy</span>
              <span className="text-white">.dev</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs text-center md:text-left font-inter">
              Turning ideas into scalable, high-quality web applications.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {heroData.socials.map((item) => {
              if (!item.url) return null;
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <item.Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-slate-500 font-inter">
            <p className="flex items-center gap-1.5">
              {t('footer.designed')} <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            </p>
            <p>&copy; {currentYear} {t('footer.rights')}</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
