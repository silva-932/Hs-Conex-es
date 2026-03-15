import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target } from 'lucide-react';

const MissionSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Target size={28} className="text-accent" />
          </div>
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">{t('mission.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-foreground">{t('mission.title')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('mission.text')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
