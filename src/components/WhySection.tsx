import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Award, CheckCircle, HeadphonesIcon, Heart } from 'lucide-react';

const reasons = [
  { icon: Lightbulb, key: 'innovation' },
  { icon: Award, key: 'expertise' },
  { icon: CheckCircle, key: 'reliable' },
  { icon: HeadphonesIcon, key: 'support' },
  { icon: Heart, key: 'satisfaction' },
];

const WhySection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why" className="section-padding section-alt" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">{t('why.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">{t('why.title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="service-card rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <r.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{t(`why.${r.key}`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`why.${r.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
