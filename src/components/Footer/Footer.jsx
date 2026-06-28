import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8 mt-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-xl font-bold font-poppins">
          <span className="text-primary">Thuy</span>
          <span className="text-white">.dev</span>
        </div>

        <div className="text-center md:text-right text-slate-400 font-inter text-sm flex flex-col items-center md:items-end">
          <p className="flex items-center gap-1">
            {t('footer.designed')} <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
          <p>&copy; {currentYear} {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
