import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, ArrowUpRight } from "lucide-react";
import { experience } from "../../data/experience";
import { useTranslation } from "react-i18next";

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              inline-flex items-center gap-3
              px-4 py-2
              rounded-full
              bg-white/[0.03]
              border border-white/[0.08]
              backdrop-blur-xl
              mb-6
            "
          >
            <Briefcase className="w-5 h-5 text-primary" />

            <span className="text-sm font-medium tracking-wide text-white">
              {t("experience.badge")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="
              text-4xl md:text-5xl
              font-bold
              font-poppins
              text-white
              leading-tight
            "
          >
            Work
            <span className="text-gradient"> Experience</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="
              mt-5
              text-slate-400
              text-base md:text-lg
              leading-relaxed
              max-w-2xl
            "
          >
            My experience through collaborative projects, software development,
            and continuous learning.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl relative">
          {/* Timeline Line */}
          <div
            className="
              absolute
              left-[19px]
              md:left-[27px]
              top-4
              bottom-4
              w-[2px]
              bg-gradient-to-b
              from-primary
              via-primary/40
              to-transparent
            "
          />

          <div className="space-y-10 relative z-10">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline Dot */}
                <div
                  className="
                    absolute
                    left-[19px]
                    md:left-[27px]
                    top-8
                    -translate-x-1/2
                    w-4 h-4
                    rounded-full
                    bg-primary
                    border-4
                    border-background
                    shadow-[0_0_20px_rgba(99,102,241,0.8)]
                    z-20
                  "
                />

                {/* Experience Card */}
                <div
                  className="
                    group
                    relative
                    rounded-3xl
                    bg-white/[0.025]
                    backdrop-blur-xl
                    border border-white/[0.08]
                    overflow-hidden
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:border-primary/30
                    hover:bg-primary/[0.025]
                  "
                >
                  {/* Top Gradient */}
                  <div
                    className="
                      absolute
                      top-0
                      left-0
                      w-full
                      h-[2px]
                      bg-gradient-to-r
                      from-primary
                      via-blue-500
                      to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-500
                    "
                  />

                  {/* Hover Glow */}
                  <div
                    className="
                      absolute
                      -top-32
                      -right-32
                      w-64
                      h-64
                      rounded-full
                      bg-primary/10
                      blur-[100px]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-500
                      pointer-events-none
                    "
                  />

                  <div className="relative z-10 p-7 md:p-9">
                    {/* Period + Index */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span
                        className="
                          inline-flex
                          items-center
                          px-4 py-2
                          rounded-full
                          bg-primary/10
                          border border-primary/20
                          text-primary
                          text-sm
                          font-semibold
                          tracking-wide
                        "
                      >
                        {exp.period}
                      </span>

                      <span
                        className="
                          text-xs
                          font-mono
                          text-slate-600
                          tracking-widest
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Role */}
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3
                          className="
                            text-2xl md:text-3xl
                            font-bold
                            font-poppins
                            text-white
                            leading-tight
                            group-hover:text-primary
                            transition-colors duration-300
                          "
                        >
                          {exp.role}
                        </h3>

                        <h4
                          className="
                            mt-2
                            text-lg
                            md:text-xl
                            font-medium
                            text-slate-400
                          "
                        >
                          {exp.company}
                        </h4>
                      </div>

                      <div
                        className="
                          hidden sm:flex
                          w-11 h-11
                          rounded-xl
                          bg-white/[0.04]
                          border border-white/[0.07]
                          items-center justify-center
                          text-slate-500
                          group-hover:text-primary
                          group-hover:border-primary/20
                          transition-all duration-300
                        "
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p
                        className="
                          mt-6
                          text-sm
                          md:text-base
                          text-slate-400
                          leading-relaxed
                          max-w-3xl
                        "
                      >
                        {exp.description}
                      </p>
                    )}

                    {/* Divider */}
                    <div className="my-7 h-px bg-white/[0.07]" />

                    {/* Responsibilities */}
                    <div className="space-y-4">
                      {exp.responsibilities.map((task, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.15 + i * 0.05,
                            duration: 0.3,
                          }}
                          className="
                            flex
                            items-start
                            gap-3
                            group/item
                          "
                        >
                          <div
                            className="
                              mt-0.5
                              w-6 h-6
                              rounded-full
                              bg-white/[0.035]
                              border border-white/[0.08]
                              flex
                              items-center
                              justify-center
                              shrink-0
                              group-hover/item:border-primary/30
                              transition-colors
                            "
                          >
                            <CheckCircle2
                              className="
                                w-3.5 h-3.5
                                text-slate-600
                                group-hover/item:text-primary
                                transition-colors
                              "
                            />
                          </div>

                          <span
                            className="
                              text-sm
                              md:text-base
                              text-slate-300
                              leading-relaxed
                              group-hover/item:text-white
                              transition-colors
                            "
                          >
                            {task}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Number */}
                  <div
                    className="
                      absolute
                      -bottom-10
                      -right-5
                      text-[120px]
                      font-bold
                      font-poppins
                      text-white/[0.015]
                      select-none
                      pointer-events-none
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
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
