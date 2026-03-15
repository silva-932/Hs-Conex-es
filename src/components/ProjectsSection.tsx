import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Network, Monitor, ShieldCheck, Factory } from 'lucide-react';

const projects = [
  { icon: Network, titleKey: 'projects.1.title', descKey: 'projects.1.desc' },
  { icon: Monitor, titleKey: 'projects.2.title', descKey: 'projects.2.desc' },
  { icon: ShieldCheck, titleKey: 'projects.3.title', descKey: 'projects.3.desc' },
  { icon: Factory, titleKey: 'projects.4.title', descKey: 'projects.4.desc' },
];

const ProjectsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">{t('projects.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">{t('projects.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('projects.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="service-card rounded-xl p-8 flex gap-5"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <proj.icon size={28} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{t(proj.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(proj.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
