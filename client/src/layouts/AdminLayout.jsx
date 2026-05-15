import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error(error);
    }
    navigate('/admin/login');
  };

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0a0705]"><div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const menuItems = [
    { name: 'لوحة القيادة', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'المنتجات / الأعمال', path: '/admin/products', icon: <FolderKanban size={20} /> },
    { name: 'الرسائل', path: '/admin/messages', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0f0a08] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 glass border-l border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
            Good Wood
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 pr-4">لوحة التحكم</p>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                ? 'bg-[#D4AF37] text-[#0f0a08] font-bold shadow-lg shadow-[#D4AF37]/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <ArrowRight size={20} />
            العودة للموقع
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 text-[#ff4b4b] hover:bg-[#ff4b4b]/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#0a0705]">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <h1 className="text-2xl font-bold">مرحباً، {user?.name || 'المدير'}</h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0f0a08] font-bold overflow-hidden border-2 border-[#D4AF37]">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0) || 'A'
                )}
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
