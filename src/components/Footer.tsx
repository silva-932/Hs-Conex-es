import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-xl font-bold text-foreground mb-3">
            HS <span className="gradient-text">Conexões</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('footer.desc')}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">{t('footer.links')}</h4>
          <div className="flex flex-col gap-2">
            {links.map(link => (
              <a key={link.key} href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">{t('footer.contact')}</h4>
          <div className="space-y-2">
            <a href="tel:+244972393965" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
              <Phone size={14} /> +244 972 393 965
            </a>
            <a href="mailto:suporte@hsconexoes.site" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
              <Mail size={14} /> suporte@hsconexoes.site
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
