import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Technology network" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,11%,0.92)] to-[hsl(222,47%,11%,0.7)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[hsl(217,91%,60%)] text-sm font-semibold tracking-widest uppercase mb-4"
          >
            HS Conexões
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ color: 'hsl(210, 40%, 98%)' }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-2xl"
            style={{ color: 'hsl(215, 20%, 75%)' }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact" className="btn-primary">
              {t('hero.cta1')}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 border-[1.5px]"
              style={{ borderColor: 'hsl(215, 20%, 40%)', color: 'hsl(210, 40%, 90%)' }}
            >
              {t('hero.cta2')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
