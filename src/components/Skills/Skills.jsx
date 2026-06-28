import { motion } from 'framer-motion';
import { Code2, LayoutTemplate, Server, Database, Wrench, Workflow } from 'lucide-react';
import { skills } from '../../data/skills';
import { useTranslation } from 'react-i18next';

// Map icons to categories
const categoryIcons = {
  "Languages": Code2,
  "Frontend": LayoutTemplate,
  "Backend": Server,
  "Database": Database,
  "Tools": Wrench,
  "Methodologies": Workflow,
};

const Skills = () => {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Server className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium tracking-wide text-white">{t('skills.badge')}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6"
          >
            {t('skills.title')}
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skillGroup, index) => {
            const Icon = categoryIcons[skillGroup.category] || Code2;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden border border-white/5 hover:border-primary/30"
              >
                {/* Subtle gradient hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-white/5 text-slate-300 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-poppins text-white">
                      {skillGroup.category}
                    </h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {skillGroup.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
                        <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
