import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-2/3"
        >
          <div className="glass-card rounded-3xl p-1 relative overflow-hidden group">
            {/* Animated Gradient Border effect via pseudo element in css, or here as a div */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative bg-card/90 backdrop-blur-xl rounded-[23px] p-8 md:p-12 border-l-4 border-l-primary flex flex-col gap-6 h-full z-10">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold font-poppins text-white">
                  {t('about.title')}
                </h2>
              </div>
              
              <p className="text-lg text-slate-300 leading-relaxed font-inter">
                Software Engineering student at FPT University passionate about Backend Development and modern web technologies.
              </p>
              
              <p className="text-lg text-slate-300 leading-relaxed font-inter">
                Experienced in building React applications, RESTful APIs, Node.js services and responsive interfaces through academic and personal projects.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed font-inter font-medium text-primary">
                Looking for Internship / OJT opportunities to improve software engineering skills and contribute to real-world products.
              </p>

              <div className="mt-4">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-primary text-slate-300 hover:text-white hover:bg-primary/10 transition-all group/btn">
                  <span className="font-medium text-sm">{t('about.more')}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
