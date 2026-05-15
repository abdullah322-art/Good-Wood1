import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import axios from 'axios';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fallbackTestimonials = [
    { id: 1, name: 'أحمد محمد', content: 'عمل احترافي جداً ودقة في المواعيد. المطبخ طلع أجمل من التصميم.', rating: 5 },
    { id: 2, name: 'سارة خالد', content: 'تعامل راقي وجودة الخشب ممتازة، أنصح بالتعامل معهم بقوة.', rating: 5 },
    { id: 3, name: 'عبدالله السالم', content: 'فصلت عندهم أثاث المكتب، شغل فاخر ويبيض الوجه.', rating: 5 },
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        if (response.data && response.data.length > 0) {
          setTestimonials(response.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        setTestimonials(fallbackTestimonials);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-[#0f0a08] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 -skew-x-12 transform origin-top"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            آراء <span className="text-[#D4AF37]">عملائنا</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 relative group hover:bg-[#D4AF37]/5 transition-colors duration-300"
            >
              <Quote className="absolute top-6 left-6 text-[#D4AF37]/20 w-16 h-16 -z-10 group-hover:text-[#D4AF37]/30 transition-colors" />
              
              <div className="flex text-[#D4AF37] mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#8a7222] rounded-full flex items-center justify-center text-[#0f0a08] font-bold text-xl mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">عميل مميز</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
