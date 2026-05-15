import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, MessageSquare, Star, TrendingUp } from 'lucide-react';
import axios from 'axios';

const StatCard = ({ title, value, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass p-6 rounded-xl border border-white/5 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 mb-2">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className="bg-[#D4AF37]/10 p-4 rounded-lg text-[#D4AF37]">
        {icon}
      </div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    testimonials: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, messagesRes, testimonialsRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/contact'),
          axios.get('/api/testimonials/all')
        ]);

        setStats({
          projects: productsRes.data.length,
          messages: messagesRes.data.length,
          testimonials: testimonialsRes.data.length
        });

        // Get top 5 recent messages
        setRecentMessages(messagesRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="إجمالي المشاريع" 
          value={stats.projects} 
          icon={<FolderKanban size={24} />} 
          delay={0.1} 
        />
        <StatCard 
          title="الرسائل الجديدة" 
          value={stats.messages} 
          icon={<MessageSquare size={24} />} 
          delay={0.2} 
        />
        <StatCard 
          title="آراء العملاء" 
          value={stats.testimonials} 
          icon={<Star size={24} />} 
          delay={0.3} 
        />
        <StatCard 
          title="زيارات الموقع" 
          value="+1.2K" 
          icon={<TrendingUp size={24} />} 
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-2 glass rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-bold text-white mb-6">أحدث الرسائل</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="pb-4 font-medium">الاسم</th>
                  <th className="pb-4 font-medium">رقم الجوال</th>
                  <th className="pb-4 font-medium">التاريخ</th>
                  <th className="pb-4 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg) => (
                  <tr key={msg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white">{msg.name}</td>
                    <td className="py-4 text-gray-300" dir="ltr">{msg.phone}</td>
                    <td className="py-4 text-gray-400">
                      {new Date(msg.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        msg.status === 'new' ? 'bg-blue-500/20 text-blue-400' : 
                        msg.status === 'read' ? 'bg-gray-500/20 text-gray-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {msg.status === 'new' ? 'جديدة' : msg.status === 'read' ? 'مقروءة' : 'تم الرد'}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentMessages.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500">
                      لا توجد رسائل حديثة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-bold text-white mb-6">إجراءات سريعة</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
              <span className="text-gray-300 group-hover:text-white">إضافة مشروع جديد</span>
              <FolderKanban size={20} className="text-[#D4AF37]" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
              <span className="text-gray-300 group-hover:text-white">إضافة رأي عميل</span>
              <Star size={20} className="text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
