import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        if (!code) {
          toast.error('حدث خطأ في عملية تسجيل الدخول');
          navigate('/admin/login');
          return;
        }

        // Send the code to the backend
        await axios.post('/api/auth/google', { code });
        
        toast.success('تم تسجيل الدخول بنجاح', {
          style: { background: '#0f0a08', color: '#D4AF37', border: '1px solid #D4AF37' }
        });
        
        navigate('/admin');
      } catch (error) {
        toast.error(error.response?.data?.error || 'فشل تسجيل الدخول باستخدام جوجل', {
          style: { background: '#0f0a08', color: '#ff4b4b', border: '1px solid #ff4b4b' }
        });
        navigate('/admin/login');
      }
    };

    handleGoogleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0705]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">جاري التحقق من الحساب...</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
