import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, MailOpen, Eye } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/contact');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/contact/${id}`, { status });
      toast.success('تم تحديث حالة الرسالة');
      fetchMessages();
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث الحالة');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      try {
        await axios.delete(`/api/contact/${id}`);
        toast.success('تم الحذف بنجاح');
        setSelectedMessage(null);
        fetchMessages();
      } catch (error) {
        toast.error('حدث خطأ أثناء الحذف');
      }
    }
  };

  const openMessage = (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'new') {
      handleUpdateStatus(msg.id, 'read');
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      {/* Messages List */}
      <div className="w-1/2 glass rounded-xl border border-white/5 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white">الرسائل الواردة</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => openMessage(msg)}
              className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors flex flex-col gap-2 ${
                selectedMessage?.id === msg.id ? 'bg-[#D4AF37]/10 border-r-4 border-r-[#D4AF37]' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className={`font-bold ${msg.status === 'new' ? 'text-white' : 'text-gray-300'}`}>
                  {msg.name}
                </h4>
                <span className="text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleDateString('ar-SA')}
                </span>
              </div>
              <p className="text-sm text-gray-400 truncate pr-2">
                {msg.message}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  msg.status === 'new' ? 'bg-blue-500/20 text-blue-400' : 
                  msg.status === 'read' ? 'bg-gray-500/20 text-gray-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {msg.status === 'new' ? 'جديدة' : msg.status === 'read' ? 'مقروءة' : 'تم الرد'}
                </span>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا توجد رسائل
            </div>
          )}
        </div>
      </div>

      {/* Message Details */}
      <div className="w-1/2 glass rounded-xl border border-white/5 flex flex-col overflow-hidden">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedMessage.name}</h3>
                <div className="flex flex-col gap-1 text-sm text-gray-400">
                  <p dir="ltr" className="text-right">{selectedMessage.phone}</p>
                  {selectedMessage.email && <p>{selectedMessage.email}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                {selectedMessage.status !== 'replied' && (
                  <button 
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'replied')}
                    className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                    title="تحديد كـ تم الرد"
                  >
                    <CheckCircle size={20} />
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  title="حذف الرسالة"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="bg-black/30 p-6 rounded-lg text-gray-300 leading-relaxed whitespace-pre-wrap border border-white/5">
                {selectedMessage.message}
              </div>
              <div className="mt-8">
                <a 
                  href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1EBE5D] transition-colors"
                >
                  الرد عبر واتساب
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
            <MailOpen size={64} className="mb-4 opacity-50" />
            <p className="text-lg">اختر رسالة لعرض محتواها</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
