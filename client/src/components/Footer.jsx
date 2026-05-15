import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0705] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] mb-6">
              Good Wood
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              نصنع الخشب بإتقان لنقدم لك قطعاً فنية تجمع بين الأصالة والمعاصرة. نتميز بالجودة والدقة في التنفيذ.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">روابط سريعة</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-[#D4AF37] transition-colors">الرئيسية</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#D4AF37] transition-colors">خدماتنا</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-[#D4AF37] transition-colors">أعمالنا</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-[#D4AF37] transition-colors">عن الورشة</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">خدماتنا</h4>
            <ul className="space-y-4">
              <li className="text-gray-400">المطابخ الحديثة</li>
              <li className="text-gray-400">غرف النوم</li>
              <li className="text-gray-400">الأبواب الخشبية</li>
              <li className="text-gray-400">الأثاث المكتبي</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400">
                <MapPin className="text-[#D4AF37] ml-3 mt-1 shrink-0" size={20} />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="text-[#D4AF37] ml-3 shrink-0" size={20} />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="text-[#D4AF37] ml-3 shrink-0" size={20} />
                <span>info@goodwood.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} ورشة Good Wood
          </p>
          <div className="text-gray-600 text-sm">
            صمم بكل إتقان
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
