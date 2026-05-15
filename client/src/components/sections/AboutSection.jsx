import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const AboutSection = () => {
  const points = [
    'خبرة تمتد لسنوات طويلة في مجال النجارة.',
    'نستخدم أجود أنواع الأخشاب الطبيعية والصناعية.',
    'حرفية عالية ودقة متناهية في التنفيذ.',
    'التزام تام بمواعيد التسليم.',
    'فريق عمل متخصص ذو كفاءة عالية.',
    'ضمان جودة شامل على كافة أعمالنا.'
  ];

  return (
    <section id="about" className="py-24 bg-[#0f0a08] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 p-2 glass rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=2000&auto=format&fit=crop" 
                alt="Woodworking craftsmanship" 
                className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border-2 border-[#D4AF37]/30 -z-10 hidden md:block"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#D4AF37]/10 -z-10 hidden md:block"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 md:bottom-10 -left-4 md:-left-12 glass p-6 border-l-4 border-[#D4AF37] shadow-2xl z-20 max-w-xs"
            >
              <p className="text-3xl font-bold text-[#D4AF37] mb-1">+15</p>
              <p className="text-white font-bold">عاماً من الخبرة</p>
              <p className="text-sm text-gray-400 mt-2">في صناعة الخشب الفاخر</p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              عن ورشة <span className="text-[#D4AF37]">Good Wood</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-300 mb-8 leading-relaxed text-justify"
            >
              نحن ورشة متخصصة في أعمال النجارة والديكور الخشبي الفاخر. انطلقنا من شغفنا بالخشب وإيماننا بأنه ليس مجرد مادة خام، بل هو روح تنبض بالحياة في مساحاتكم.
              <br/><br/>
              نجمع بين عراقة الحرفة اليدوية وحداثة التصميم والتكنولوجيا لنقدم لكم قطعاً فنية تتوارثها الأجيال. نؤمن بأن كل تفصيل صغير يصنع فارقاً كبيراً في النتيجة النهائية.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {points.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  className="flex items-start"
                >
                  <CheckCircle2 className="text-[#D4AF37] ml-3 shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
