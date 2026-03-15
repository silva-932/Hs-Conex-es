import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Mensagem enviada com sucesso! / Message sent successfully!');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding section-alt" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">{t('contact.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">{t('contact.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder={t('contact.name')}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <input
              type="email"
              placeholder={t('contact.email')}
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <input
              type="text"
              placeholder={t('contact.subject')}
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <textarea
              placeholder={t('contact.message')}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
            <button type="submit" className="btn-primary w-full">
              {t('contact.send')}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t('contact.phone')}</p>
                <a href="tel:+244972393965" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  +244 972 393 965
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t('contact.email')}</p>
                <a href="mailto:suporte@hsconexoes.site" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  suporte@hsconexoes.site
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t('contact.location')}</p>
                <p className="text-sm text-muted-foreground">{t('contact.location.value')}</p>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/244972393965"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
              style={{ background: 'hsl(142, 70%, 45%)' }}
            >
              <MessageCircle size={18} />
              {t('contact.whatsapp')}
            </a>

            {/* Map placeholder */}
            <div className="w-full h-48 rounded-xl border border-border bg-card flex items-center justify-center">
              <div className="text-center text-muted-foreground text-sm">
                <MapPin size={32} className="mx-auto mb-2 text-accent/40" />
                Luanda, Angola
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
