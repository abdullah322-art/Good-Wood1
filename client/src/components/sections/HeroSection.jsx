import { motion } from 'framer-motion';
import { ArrowLeft, PhoneCall } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1606283582496-d8f99e829dc7?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Woodwork" 
          className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a08]/80 via-[#0f0a08]/60 to-[#0f0a08]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-[#D4AF37] tracking-widest uppercase text-sm md:text-base font-semibold mb-4"
            initial={{ opacity: 0, letterSpacing: '0em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            ورشة Good Wood للنجارة
          </motion.h2>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            تفاصيل تصنع <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">الفخامة</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            نقدم أعمال نجارة تجمع بين الحرفية التقليدية والتصميم العصري. متخصصون في صناعة الأثاث والمطابخ والأبواب الخشبية بأعلى معايير الجودة والدقة.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a 
              href="#projects" 
              className="group flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0f0a08] px-8 py-4 w-full sm:w-auto font-bold text-lg hover:bg-[#F3E5AB] transition-all duration-300"
            >
              شاهد أعمالنا
              <ArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" size={20} />
            </a>
            
            <a 
              href="#contact" 
              className="flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] px-8 py-4 w-full sm:w-auto font-bold text-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <PhoneCall size={20} />
              اطلب استشارة
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-gray-400 text-sm tracking-widest">اكتشف المزيد</span>
        <div className="w-px h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-[#D4AF37]"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
