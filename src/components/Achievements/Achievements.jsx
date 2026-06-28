import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {achievements.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl flex items-center gap-6 group hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-white/10"
            >
              <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <div>
                <h4 className="text-lg font-bold font-poppins text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-sm font-medium text-slate-400">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
