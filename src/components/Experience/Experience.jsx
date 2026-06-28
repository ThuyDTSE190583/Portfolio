import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { experience } from '../../data/experience';
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium tracking-wide text-white">{t('experience.badge')}</span>
          </motion.div>
        </div>

        <div className="max-w-4xl relative">
          {/* Timeline Glowing Line */}
          <div className="absolute left-4 md:left-8 top-4 bottom-0 w-[2px] bg-gradient-to-b from-primary via-blue-900 to-transparent"></div>

          <div className="space-y-12 relative z-10">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-12 md:pl-20 group"
              >
                {/* Timeline Animated Dot */}
                <div className="absolute left-[11px] md:left-[27px] top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_15px_rgba(37,99,235,0.8)] group-hover:scale-125 transition-transform duration-300"></div>

                <div className="glass-card p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide w-fit">
                      {exp.period}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold font-poppins text-white mb-2">
                    {exp.role}
                  </h3>
                  
                  <h4 className="text-lg font-medium text-slate-400 mb-8">
                    {exp.company}
                  </h4>
                  
                  <ul className="space-y-4">
                    {exp.responsibilities.map((task, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <CheckCircle2 className="w-5 h-5 text-slate-600 mt-0.5 group-hover/item:text-primary transition-colors shrink-0" />
                        <span className="text-slate-300 font-inter leading-relaxed group-hover/item:text-white transition-colors">
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
