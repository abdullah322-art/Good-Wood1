import { motion } from 'framer-motion';
import { Ruler, Home, Briefcase, DoorOpen, Palette, Settings } from 'lucide-react';

const services = [
  {
    title: 'المطابخ',
    description: 'تصميم وتنفيذ مطابخ عصرية وكلاسيكية بأجود أنواع الخشب وأحدث التقنيات.',
    icon: <Home className="w-10 h-10 text-[#D4AF37]" />
  },
  {
    title: 'غرف النوم',
    description: 'غرف نوم فاخرة مصممة خصيصاً لراحتك، مع الاهتمام بأدق التفاصيل والتشطيبات.',
    icon: <Briefcase className="w-10 h-10 text-[#D4AF37]" />
  },
  {
    title: 'الأثاث المكتبي',
    description: 'حلول متكاملة للمكاتب والشركات، أثاث عملي وأنيق يعكس احترافية عملك.',
    icon: <Settings className="w-10 h-10 text-[#D4AF37]" />
  },
  {
    title: 'الأبواب الخشبية',
    description: 'أبواب داخلية وخارجية متينة وبتصاميم جذابة تناسب جميع الديكورات.',
    icon: <DoorOpen className="w-10 h-10 text-[#D4AF37]" />
  },
  {
    title: 'الديكورات',
    description: 'ديكورات خشبية جدارية وتلبيسات تضيف لمسة من الدفء والفخامة لمساحتك.',
    icon: <Palette className="w-10 h-10 text-[#D4AF37]" />
  },
  {
    title: 'التفصيل حسب الطلب',
    description: 'تنفيذ أي تصميم خشبي بخيالك، نترجم أفكارك إلى قطع فنية ملموسة.',
    icon: <Ruler className="w-10 h-10 text-[#D4AF37]" />
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-[#0a0705] relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            خدماتنا <span className="text-[#D4AF37]">المتميزة</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto"
          >
            نقدم مجموعة متكاملة من خدمات النجارة والديكور الخشبي بأعلى مستويات الاحترافية والجودة.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full -z-10 group-hover:bg-[#D4AF37]/10 transition-colors duration-300"></div>
              
              <div className="mb-6 inline-block p-4 bg-black/40 rounded-2xl border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors duration-300 shadow-lg">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>
              
              <div className="mt-8 overflow-hidden h-1 w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500 ease-out"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
