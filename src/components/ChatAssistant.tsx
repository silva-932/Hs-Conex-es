import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: number;
  role: 'assistant' | 'user';
  content: string;
}

interface QuickOption {
  label: string;
  value: string;
}

const ChatAssistant = () => {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const quickOptions: QuickOption[] = [
    { label: t('chat.quick.services'), value: 'services' },
    { label: t('chat.quick.contact'), value: 'contact' },
    { label: t('chat.quick.about'), value: 'about' },
  ];

  useEffect(() => {
    if (open && messages.length === 0) {
      addAssistantMessage(t('chat.greeting'));
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const addAssistantMessage = (content: string) => {
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: ++idRef.current, role: 'assistant', content }]);
      setTyping(false);
    }, 600);
  };

  const getResponse = (text: string): string => {
    const lower = text.toLowerCase();

    // Services
    if (matchAny(lower, ['serviço', 'service', 'servicio', 'what do you do', 'o que fazem', 'que hacen', 'que faites'])) {
      return t('chat.response.services');
    }
    // Web dev
    if (matchAny(lower, ['web', 'site', 'website', 'desenvolvimento web', 'web development', 'desarrollo web'])) {
      return t('chat.response.webdev');
    }
    // School / education
    if (matchAny(lower, ['escola', 'school', 'escuela', 'école', 'gestão escolar', 'school management', 'educação', 'education'])) {
      return t('chat.response.school');
    }
    // Business management
    if (matchAny(lower, ['gestão empresarial', 'business management', 'erp', 'gestión empresarial', 'gestion entreprise', 'empresa'])) {
      return t('chat.response.business');
    }
    // IT infrastructure
    if (matchAny(lower, ['infraestrutura', 'infrastructure', 'servidor', 'server', 'data center', 'cloud', 'nuvem'])) {
      return t('chat.response.infra');
    }
    // Networking
    if (matchAny(lower, ['rede', 'network', 'red', 'réseau', 'telecomunicação', 'telecom', 'conectividade', 'connectivity'])) {
      return t('chat.response.network');
    }
    // Software
    if (matchAny(lower, ['software', 'aplicação', 'application', 'app', 'sistema', 'system', 'programa'])) {
      return t('chat.response.software');
    }
    // Security
    if (matchAny(lower, ['segurança', 'security', 'seguridad', 'sécurité', 'cyber', 'ciber', 'proteção', 'protection'])) {
      return t('chat.response.security');
    }
    // Contact
    if (matchAny(lower, ['contacto', 'contact', 'contactar', 'falar', 'talk', 'hablar', 'parler', 'whatsapp', 'telefone', 'phone', 'email'])) {
      return t('chat.response.contact');
    }
    // About
    if (matchAny(lower, ['sobre', 'about', 'quem', 'who', 'quien', 'qui êtes'])) {
      return t('chat.response.about');
    }
    // Price
    if (matchAny(lower, ['preço', 'price', 'precio', 'prix', 'custo', 'cost', 'orçamento', 'budget', 'quanto'])) {
      return t('chat.response.price');
    }
    // Greeting
    if (matchAny(lower, ['olá', 'oi', 'hello', 'hi', 'hey', 'hola', 'bonjour', 'bom dia', 'boa tarde', 'boa noite'])) {
      return t('chat.response.hello');
    }
    // Thanks
    if (matchAny(lower, ['obrigado', 'obrigada', 'thank', 'gracias', 'merci'])) {
      return t('chat.response.thanks');
    }

    return t('chat.response.default');
  };

  const matchAny = (text: string, keywords: string[]) => keywords.some(k => text.includes(k));

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { id: ++idRef.current, role: 'user', content: msg }]);
    setInput('');
    addAssistantMessage(getResponse(msg));
  };

  const handleQuick = (option: QuickOption) => {
    handleSend(option.label);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: open ? 'none' : 'flex' }}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-4rem)] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <MessageCircle size={16} className="text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">HS Conexões</p>
                  <p className="text-xs opacity-80">{t('chat.status')}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-white/10 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-accent text-accent-foreground rounded-br-sm'
                        : 'bg-secondary text-secondary-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-xl rounded-bl-sm px-4 py-2.5 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}

              {/* Quick options after greeting */}
              {messages.length === 1 && !typing && (
                <div className="flex flex-wrap gap-2">
                  {quickOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleQuick(opt)}
                      className="text-xs px-3 py-1.5 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Contact shortcuts */}
            <div className="flex items-center gap-2 px-4 py-2 border-t border-border">
              <a href="https://wa.me/244972393965" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-[hsl(142,70%,45%)]/10 text-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,45%)]/20 transition-colors">
                <Phone size={12} /> WhatsApp
              </a>
              <a href="mailto:suporte@hsconexoes.site"
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                <Mail size={12} /> Email
              </a>
              <a href="#contact" onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                <FileText size={12} /> {t('chat.form')}
              </a>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('chat.placeholder')}
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2 rounded-lg bg-accent text-accent-foreground disabled:opacity-40 hover:bg-accent/90 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
