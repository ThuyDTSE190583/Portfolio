import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Phone, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing.");
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      });
      setSubmitStatus('success');
      form.current.reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      console.error("Error Text:", error.text);
      console.error("Using Service ID:", serviceId);
      console.error("Using Template ID:", templateId);
      console.error("Using Public Key:", publicKey);
      console.error("Payload:", templateParams);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card"
            >
              <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium tracking-wide text-white">{t('contact.badge')}</span>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12"
          >
            <div className="glass-card h-full p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]"></div>
              
              <h3 className="text-2xl font-bold font-poppins text-white mb-8">
                {t('contact.title')}
              </h3>
              
              <div className="space-y-6">
                <a href="mailto:dothanhthuy.dev@gmail.com" aria-label="Email dothanhthuy.dev@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium">{t('contact.email')}</p>
                    <p className="text-white font-medium group-hover:text-primary transition-colors">
                      dothanhthuy.dev@gmail.com
                    </p>
                  </div>
                </a>

                <a href="tel:+84946736750" aria-label="Call +84 946 736 750" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium">Phone</p>
                    <p className="text-white font-medium group-hover:text-primary transition-colors">
                      +84 946 736 750
                    </p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium">{t('contact.location')}</p>
                    <p className="text-white font-medium">
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>

                <a href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub Profile" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors shrink-0">
                    <FaGithub className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium">{t('contact.github')}</p>
                    <p className="text-white font-medium group-hover:text-primary transition-colors">
                      github.com/{import.meta.env.VITE_GITHUB_USERNAME}
                    </p>
                  </div>
                </a>

                {import.meta.env.VITE_LINKEDIN_URL && (
                  <a href={import.meta.env.VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn Profile" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors shrink-0">
                      <FaLinkedin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-medium">LinkedIn</p>
                      <p className="text-white font-medium group-hover:text-primary transition-colors truncate max-w-[200px]">
                        {import.meta.env.VITE_LINKEDIN_URL.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                )}
                
                {import.meta.env.VITE_FACEBOOK_URL && (
                  <a href={import.meta.env.VITE_FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Visit Facebook Profile" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors shrink-0">
                      <FaFacebook className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-medium">Facebook</p>
                      <p className="text-white font-medium group-hover:text-primary transition-colors truncate max-w-[200px]">
                        {import.meta.env.VITE_FACEBOOK_URL.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-7/12"
          >
            <div className="glass-card h-full p-8 md:p-10 rounded-3xl border border-white/5 flex flex-col justify-center">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                      {t('contact.name_label')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder={t('contact.name_placeholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                      {t('contact.email_label')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder={t('contact.email_placeholder')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                    {t('contact.message_label')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder={t('contact.message_placeholder')}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-medium hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      <span>{t('contact.sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                      <span>{t('contact.send')}</span>
                    </>
                  )}
                </button>

                <div aria-live="polite">
                  {submitStatus === 'success' && (
                    <p className="text-emerald-400 text-center font-medium bg-emerald-400/10 py-3 rounded-xl border border-emerald-400/20 mt-4">{t('contact.success')}</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-center font-medium bg-red-400/10 py-3 rounded-xl border border-red-400/20 mt-4">{t('contact.error')}</p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Contact;
