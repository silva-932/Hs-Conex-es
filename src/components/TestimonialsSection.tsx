import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Quote } from 'lucide-react';

const testimonials = [
  { textKey: 'testimonials.1', nameKey: 'testimonials.1.name', roleKey: 'testimonials.1.role' },
  { textKey: 'testimonials.2', nameKey: 'testimonials.2.name', roleKey: 'testimonials.2.role' },
  { textKey: 'testimonials.3', nameKey: 'testimonials.3.name', roleKey: 'testimonials.3.role' },
];

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding section-alt" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">{t('testimonials.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">{t('testimonials.title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.textKey}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="service-card rounded-xl p-6"
            >
              <Quote size={24} className="text-accent/30 mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t(item.textKey)}</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t(item.nameKey)}</p>
                <p className="text-xs text-muted-foreground">{t(item.roleKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
