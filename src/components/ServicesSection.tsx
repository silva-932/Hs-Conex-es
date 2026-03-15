import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Server, Wifi, Code, Shield, TrendingUp, Cog } from 'lucide-react';

const services = [
  { icon: Server, titleKey: 'services.it.title', descKey: 'services.it.desc' },
  { icon: Wifi, titleKey: 'services.net.title', descKey: 'services.net.desc' },
  { icon: Code, titleKey: 'services.dev.title', descKey: 'services.dev.desc' },
  { icon: Shield, titleKey: 'services.sec.title', descKey: 'services.sec.desc' },
  { icon: TrendingUp, titleKey: 'services.digital.title', descKey: 'services.digital.desc' },
  { icon: Cog, titleKey: 'services.auto.title', descKey: 'services.auto.desc' },
];

const ServicesSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding section-alt" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">{t('services.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">{t('services.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="service-card rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <svc.icon size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{t(svc.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(svc.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
