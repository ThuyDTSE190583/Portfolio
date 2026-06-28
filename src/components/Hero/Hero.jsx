import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { Link as ScrollLink } from 'react-scroll';
import ParticleBackground from './ParticleBackground';
import OrbitingAvatar from './OrbitingAvatar';
import { heroData } from './heroData';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <ParticleBackground />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0"
          >
            {/* Greeting */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 border border-white/5 shadow-lg"
            >
              <span className="text-sm font-medium text-slate-300">{heroData.greeting}</span>
              <span className="animate-bounce inline-block origin-bottom" role="img" aria-label="Waving hand">👋</span>
            </motion.div>
            
            {/* Name */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins mb-4 tracking-tight text-white"
            >
              {heroData.name}
            </motion.h1>
            
            {/* Typing Effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-6 h-[40px] md:h-[60px]" 
              aria-live="polite"
            >
              <TypeAnimation
                sequence={heroData.roles}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-slate-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-inter"
            >
              {heroData.description}
            </motion.p>
            
            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href={heroData.resumeUrl}
                download
                aria-label="Download CV"
                className="group flex items-center gap-2 px-7 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" aria-hidden="true" />
                {t('hero.download_cv')}
              </a>
              
              {import.meta.env.VITE_GITHUB_USERNAME && (
                <a
                  href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GitHub Profile"
                  className="flex items-center gap-2 px-7 py-3.5 glass-card text-white rounded-xl font-medium hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
                >
                  <FaGithub className="w-5 h-5" aria-hidden="true" />
                  GitHub
                </a>
              )}

              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                aria-label="Contact Me"
                className="cursor-pointer flex items-center gap-2 px-7 py-3.5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/5 transition-all hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                Contact
              </ScrollLink>
            </motion.div>

            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-5"
            >
              {heroData.socials.map((item) => {
                if (!item.url) return null; // Gracefully hide if variable is missing
                return (
                  <a 
                    key={item.id} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={item.ariaLabel} 
                    className="p-3.5 rounded-full bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-primary transition-all hover:-translate-y-1 border border-white/5 hover:border-primary/50 group"
                  >
                    <item.Icon className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Avatar Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <OrbitingAvatar />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
