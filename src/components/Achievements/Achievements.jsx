import { motion } from 'framer-motion';
import { ExternalLink, Trophy, CalendarDays, Award } from 'lucide-react';
import { achievements } from '../../data/achievements';
import { useTranslation } from 'react-i18next';

const Achievements = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="achievements"
      className="relative py-28 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-purple-600/8 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Section heading */}
        <div className="max-w-3xl mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium tracking-wide text-white">
              {t('achievements.badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white leading-tight"
          >
            Certifications &
            <span className="text-gradient"> Achievements</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Professional certifications, academic achievements, and
            continuous learning milestones.
          </motion.p>
        </div>

        {/* Certificate grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {achievements.map((item) => {
            const Wrapper = item.url ? 'a' : 'div';

            const wrapperProps = item.url
              ? {
                  href: item.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {};

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group"
              >
                <Wrapper
                  {...wrapperProps}
                  className={`
                    relative block h-full min-h-[290px]
                    rounded-3xl
                    bg-white/[0.025]
                    backdrop-blur-xl
                    border border-white/[0.08]
                    p-6
                    overflow-hidden
                    transition-all duration-500
                    hover:-translate-y-1.5
                    hover:border-primary/30
                    hover:bg-primary/[0.035]
                    ${item.url ? 'cursor-pointer' : ''}
                  `}
                >
                  {/* Hover glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top row */}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div
                      className={`
                        w-12 h-12 rounded-2xl
                        ${item.bg}
                        flex items-center justify-center
                        border border-white/5
                        group-hover:scale-105
                        transition-transform duration-300
                      `}
                    >
                      <item.icon
                        className={`w-6 h-6 ${item.color}`}
                      />
                    </div>

                    {item.issuer && (
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        {item.issuer}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-7">
                    <h3
                      className="
                        text-xl font-bold font-poppins
                        text-white
                        leading-snug
                        group-hover:text-primary
                        transition-colors duration-300
                      "
                    >
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-400 leading-relaxed min-h-[44px]">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="pt-5 border-t border-white/[0.07] flex items-end justify-between gap-4">
                      
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>
                          Issued{' '}
                          <span className="text-slate-300 font-medium">
                            {item.date}
                          </span>
                        </span>
                      </div>

                      {item.url && (
                        <span
                          className="
                            inline-flex items-center gap-2
                            px-3.5 py-2
                            rounded-xl
                            bg-primary/10
                            border border-primary/20
                            text-primary
                            text-xs font-semibold
                            group-hover:bg-primary
                            group-hover:text-white
                            transition-all duration-300
                          "
                        >
                          View Certificate
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Decorative icon */}
                  <Award
                    className="
                      absolute
                      -bottom-8
                      -right-8
                      w-28
                      h-28
                      text-white/[0.025]
                      rotate-12
                      group-hover:text-primary/[0.05]
                      transition-colors duration-500
                    "
                  />
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
