import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">{t('about.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-8 text-foreground">{t('about.title')}</h2>
          <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
