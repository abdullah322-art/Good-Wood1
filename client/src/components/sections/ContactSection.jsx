import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('/api/contact', formData);
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', {
        style: {
          background: '#0f0a08',
          color: '#D4AF37',
          border: '1px solid #D4AF37'
        }
      });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', {
        style: {
          background: '#0f0a08',
          color: '#ff4b4b',
          border: '1px solid #ff4b4b'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0f0a08]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            تواصل <span className="text-[#D4AF37]">معنا</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto"
          ></motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 space-y-8"
          >
            <div className="glass p-8 rounded-sm">
              <h3 className="text-2xl font-bold text-white mb-8">معلومات التواصل</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37] ml-4 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">العنوان</h4>
                    <p className="text-gray-400 leading-relaxed">المنطقة الصناعية، الرياض<br/>المملكة العربية السعودية</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37] ml-4 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">الهاتف</h4>
                    <p className="text-gray-400" dir="ltr">+966 50 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37] ml-4 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">البريد الإلكتروني</h4>
                    <p className="text-gray-400">info@goodwood.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37] ml-4 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">ساعات العمل</h4>
                    <p className="text-gray-400">السبت - الخميس: 8:00 ص - 6:00 م<br/>الجمعة: مغلق</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="glass p-8 rounded-sm mb-8">
              <h3 className="text-2xl font-bold text-white mb-8">أرسل رسالة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">الاسم الكامل *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="الاسم الكامل"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">رقم الجوال *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    dir="ltr"
                    className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-right"
                    placeholder="05x xxx xxxx"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">البريد الإلكتروني (اختياري)</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-left"
                  placeholder="email@example.com"
                  dir="ltr"
                />
              </div>
              <div className="mb-8">
                <label className="block text-gray-300 mb-2 font-medium">رسالتك *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4" 
                  className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="كيف يمكننا مساعدتك؟"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0f0a08] py-4 rounded-sm font-bold text-lg hover:bg-[#F3E5AB] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                {!isSubmitting && <Send size={20} />}
              </button>
            </form>

            {/* Map Placeholder */}
            <div className="h-64 glass rounded-sm overflow-hidden flex items-center justify-center border border-white/10 relative group">
              <div className="absolute inset-0 bg-[#D4AF37]/5"></div>
              <MapPin size={48} className="text-[#D4AF37] opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#D4AF37] font-bold px-6 py-2 border border-[#D4AF37]">عرض الخريطة</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
