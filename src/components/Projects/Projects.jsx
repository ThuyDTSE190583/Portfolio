import { motion } from 'framer-motion';
import { Code, ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../../data/projects';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Code className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium tracking-wide text-white">{t('projects.badge')}</span>
            </motion.div>
          </div>
          <motion.a 
            href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <span className="font-medium text-sm">{t('projects.view_all')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-[2rem] overflow-hidden group hover:border-primary/50 transition-all duration-500 border border-white/5 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Content */}
              <div className="p-8 pt-0 flex-1 flex flex-col relative z-20 -mt-6">
                <h3 className="text-2xl font-bold font-poppins text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-inter flex-1">
                  {project.description}
                </p>
                
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-white/5 text-slate-300 text-xs font-medium rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className="text-slate-400 hover:text-white transition-colors group/link flex items-center gap-2 text-sm font-medium"
                      >
                        <FaGithub className="w-5 h-5 group-hover/link:text-primary transition-colors" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo for ${project.title}`}
                      className="text-slate-400 hover:text-white transition-colors group/link flex items-center gap-2 text-sm font-medium"
                    >
                      <span className="group-hover/link:text-primary transition-colors">{t('projects.live_demo')}</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:text-primary transition-colors" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
