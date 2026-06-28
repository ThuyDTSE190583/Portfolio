import { motion } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';
import { achievements } from '../../data/achievements';
import { useTranslation } from 'react-i18next';

const Achievements = () => {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium tracking-wide text-white">{t('achievements.badge')}</span>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((item) => {
            const Wrapper = item.url ? 'a' : 'div';
            const wrapperProps = item.url ? { href: item.url, target: "_blank", rel: "noopener noreferrer" } : {};
            
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative"
              >
                <Wrapper
                  {...wrapperProps}
                  className={`glass-card p-6 rounded-2xl flex flex-col group-hover:-translate-y-2 transition-all duration-300 border border-white/5 hover:border-primary/30 relative overflow-hidden ${item.url ? 'cursor-pointer h-full' : 'h-full'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div className="flex-grow">
                        {item.issuer && <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">{item.issuer}</p>}
                        <h4 className="text-lg font-bold font-poppins text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug min-h-[3.5rem]">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-400 mb-6 flex-grow">
                      {item.subtitle}
                    </p>

                    {(item.date || item.credentialId || item.url) && (
                      <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between text-xs font-medium">
                        <div className="flex flex-col gap-1 text-slate-400">
                          {item.date && <span>Issued: <span className="text-slate-300">{item.date}</span></span>}
                          {item.credentialId && <span className="font-mono text-slate-500 opacity-70 text-[10px]">ID: {item.credentialId}</span>}
                        </div>
                        {item.url && (
                          <div className="flex items-center gap-1.5 text-primary group-hover:translate-x-1 transition-transform bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                            <span>View</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
