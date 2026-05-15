import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', formData);
      toast.success('تم تسجيل الدخول بنجاح', {
        style: { background: '#0f0a08', color: '#D4AF37', border: '1px solid #D4AF37' }
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('بيانات الدخول غير صحيحة', {
        style: { background: '#0f0a08', color: '#ff4b4b', border: '1px solid #ff4b4b' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0705] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606283582496-d8f99e829dc7?q=80&w=2070&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 glass rounded-xl relative z-10 border-t-4 border-[#D4AF37]"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] mb-2">
            Good Wood
          </h2>
          <p className="text-gray-400">تسجيل الدخول للوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">البريد الإلكتروني</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-3 pr-10 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="admin@goodwood.com"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">كلمة المرور</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-3 pr-10 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#D4AF37] text-[#0f0a08] py-3 rounded-lg font-bold text-lg hover:bg-[#F3E5AB] transition-all duration-300 disabled:opacity-70 flex justify-center items-center shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-[#0f0a08] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'دخول'
            )}
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">أو</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button
            type="button"
            onClick={async () => {
              try {
                const response = await axios.get('/api/auth/google/url');
                if (response.data.url) {
                  window.location.href = response.data.url;
                }
              } catch (error) {
                toast.error('تعذر الاتصال بخدمة جوجل');
              }
            }}
            className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span>تسجيل الدخول باستخدام جوجل</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
