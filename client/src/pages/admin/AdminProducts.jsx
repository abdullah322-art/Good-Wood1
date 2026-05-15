import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Search, Filter, UploadCloud, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    category: '',
    featured: false,
    available: true,
    images: [] // Array of URLs
  });
  
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('فشل في تحميل المنتجات');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (searchTerm) {
      result = result.filter(p => p.name.includes(searchTerm) || p.description.includes(searchTerm));
    }
    if (filterCategory) {
      result = result.filter(p => p.category === filterCategory);
    }
    setFilteredProducts(result);
  }, [searchTerm, filterCategory, products]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadData = new FormData();
    files.forEach(file => {
      uploadData.append('images', file);
    });

    setIsUploading(true);
    try {
      const response = await axios.post('/api/upload', uploadData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const newUrls = response.data.urls;
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newUrls]
      }));
      toast.success('تم رفع الصور بنجاح');
    } catch (error) {
      toast.error('فشل في رفع الصور');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      toast.error('يرجى إضافة صورة واحدة على الأقل');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      };

      if (editingId) {
        await axios.put(`/api/products/${editingId}`, payload);
        toast.success('تم تعديل المنتج بنجاح');
      } else {
        await axios.post('/api/products', payload);
        toast.success('تمت إضافة المنتج بنجاح');
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', description: '', price: '', oldPrice: '',
      category: '', featured: false, available: true, images: []
    });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price || '',
      oldPrice: product.oldPrice || '',
      category: product.category,
      featured: product.featured,
      available: product.available,
      images: product.images.map(img => img.url)
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج بشكل نهائي؟')) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success('تم الحذف بنجاح');
        fetchProducts();
      } catch (error) {
        toast.error('حدث خطأ أثناء الحذف');
      }
    }
  };

  return (
    <div>
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-white">إدارة المنتجات والأعمال</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="بحث..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg py-2 pr-10 pl-4 text-white focus:outline-none focus:border-[#D4AF37] w-full sm:w-64"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#1a120f] border border-white/10 rounded-lg py-2 pr-10 pl-4 text-white focus:outline-none focus:border-[#D4AF37] appearance-none w-full sm:w-48"
            >
              <option value="">جميع الأقسام</option>
              <option value="المطابخ">المطابخ</option>
              <option value="غرف النوم">غرف النوم</option>
              <option value="الأبواب">الأبواب</option>
              <option value="الأثاث المكتبي">الأثاث المكتبي</option>
              <option value="ديكورات">ديكورات</option>
            </select>
          </div>

          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-[#D4AF37] text-[#0f0a08] px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#F3E5AB] transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            إضافة منتج
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-white/5">
              <tr className="text-gray-300 border-b border-white/10">
                <th className="p-4 font-medium">المنتج</th>
                <th className="p-4 font-medium">القسم</th>
                <th className="p-4 font-medium">السعر</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-md bg-black/30 flex-shrink-0 overflow-hidden border border-white/10">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><ImageIcon size={20} className="text-gray-500" /></div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{product.name}</h4>
                        {product.featured && <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full mt-1 inline-block">مميز</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{product.category}</td>
                  <td className="p-4 text-white">
                    {product.price ? `${product.price} ر.س` : 'غير محدد'}
                  </td>
                  <td className="p-4">
                    {product.available ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">متوفر</span>
                    ) : (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">غير متوفر</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => handleEdit(product)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors" title="تعديل">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors" title="حذف">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    لا توجد منتجات تطابق بحثك
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0f0a08] border border-white/10 w-full max-w-3xl rounded-xl relative my-8 shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0f0a08] z-10 rounded-t-xl">
              <h3 className="text-xl font-bold text-white">
                {editingId ? 'تعديل منتج' : 'إضافة منتج جديد'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white p-2 bg-white/5 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2 font-medium">اسم المنتج / المشروع *</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#D4AF37] outline-none"
                    placeholder="مثال: مطبخ خشبي كلاسيكي"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2 font-medium">الوصف باللغة العربية *</label>
                  <textarea 
                    name="description" value={formData.description} onChange={handleChange} required rows="4"
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#D4AF37] outline-none resize-none"
                    placeholder="اكتب وصفاً دقيقاً للمنتج ومميزاته..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">القسم *</label>
                  <select 
                    name="category" value={formData.category} onChange={handleChange} required
                    className="w-full bg-[#1a120f] border border-white/10 rounded-lg p-3 text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="">اختر القسم</option>
                    <option value="المطابخ">المطابخ</option>
                    <option value="غرف النوم">غرف النوم</option>
                    <option value="الأبواب">الأبواب</option>
                    <option value="الأثاث المكتبي">الأثاث المكتبي</option>
                    <option value="ديكورات">ديكورات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">السعر الحالي (ر.س)</label>
                  <input 
                    type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01"
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#D4AF37] outline-none text-left" dir="ltr"
                    placeholder="مثال: 5000"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">السعر القديم (للعروض)</label>
                  <input 
                    type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} min="0" step="0.01"
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#D4AF37] outline-none text-left" dir="ltr"
                    placeholder="مثال: 6500"
                  />
                </div>

                <div className="flex flex-col justify-center gap-4 border border-white/10 p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" id="available" name="available" checked={formData.available} onChange={handleChange}
                      className="w-5 h-5 accent-[#D4AF37] cursor-pointer"
                    />
                    <label htmlFor="available" className="text-gray-300 cursor-pointer font-medium">المنتج متوفر حالياً</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange}
                      className="w-5 h-5 accent-[#D4AF37] cursor-pointer"
                    />
                    <label htmlFor="featured" className="text-gray-300 cursor-pointer font-medium">عرض في قسم "منتجات مميزة"</label>
                  </div>
                </div>

                {/* Image Upload Area */}
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2 font-medium">صور المنتج *</label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {formData.images.map((url, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-white/10 aspect-square">
                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button" 
                            onClick={() => removeImage(index)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div 
                      className={`relative rounded-lg border-2 border-dashed aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors ${
                        isDragging ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-600 hover:border-[#D4AF37]'
                      } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={() => !isUploading && fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {isUploading ? (
                        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <UploadCloud size={32} className="text-gray-400 mb-2" />
                          <span className="text-xs text-gray-400">إضافة صور</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        multiple 
                        accept="image/jpeg,image/png,image/webp" 
                        className="hidden" 
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">يمكنك رفع صور متعددة (JPG, PNG, WebP) - الحد الأقصى 5 ميجابايت للصورة.</p>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4 border-t border-white/10 pt-6">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-lg text-gray-400 bg-white/5 hover:bg-white/10 font-medium transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit" disabled={isSubmitting || isUploading}
                  className="bg-[#D4AF37] text-[#0f0a08] px-8 py-3 rounded-lg font-bold hover:bg-[#F3E5AB] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? 'جاري الحفظ...' : 'حفظ المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
