import { motion } from 'framer-motion';
import { ShieldCheck, Clock, ThumbsUp, DollarSign, Award, PenTool } from 'lucide-react';

const reasons = [
  { icon: <ShieldCheck size={32} />, title: 'خامات ممتازة', desc: 'نختار أجود أنواع الأخشاب والإكسسوارات لضمان المتانة.' },
  { icon: <PenTool size={32} />, title: 'تصميمات عصرية', desc: 'نواكب أحدث صيحات الديكور ونبتكر تصاميم فريدة.' },
  { icon: <Award size={32} />, title: 'تنفيذ دقيق', desc: 'عناية فائقة بأدق التفاصيل والتشطيبات النهائية.' },
  { icon: <DollarSign size={32} />, title: 'أسعار مناسبة', desc: 'نقدم أفضل قيمة مقابل السعر لعملائنا.' },
  { icon: <Clock size={32} />, title: 'تسليم سريع', desc: 'نلتزم بالجدول الزمني المحدد للتسليم دون تأخير.' },
  { icon: <ThumbsUp size={32} />, title: 'خبرة طويلة', desc: 'فريق من أمهر النجارين والحرفيين ذوي الخبرة.' }
];

const WhyUsSection = () => {
  return (
    <section className="py-24 bg-[#0a0705] relative border-y border-white/5">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            لماذا تختار <span className="text-[#D4AF37]">Good Wood</span>؟
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start p-6 rounded-lg hover:bg-white/5 transition-colors duration-300"
            >
              <div className="bg-[#D4AF37]/10 text-[#D4AF37] p-4 rounded-full ml-6 shrink-0 border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-gray-400">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
