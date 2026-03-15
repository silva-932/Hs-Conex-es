import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const stats = [
  { value: '150+', key: 'stats.projects' },
  { value: '200+', key: 'stats.networks' },
  { value: '80+', key: 'stats.clients' },
  { value: '8+', key: 'stats.years' },
];

const StatsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 px-4" ref={ref}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="stat-card rounded-xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">{s.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{t(s.key)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
