import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import axios from 'axios';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('الكل');
  const [selectedImage, setSelectedImage] = useState(null);

  // Fallback data in case API fails
  const fallbackProjects = [
    { id: 1, title: 'مطبخ مودرن', category: 'المطابخ', imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'غرفة نوم ملكية', category: 'غرف النوم', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop' },
    { id: 3, title: 'باب خشبي فخم', category: 'الأبواب', imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop' },
    { id: 4, title: 'طاولة طعام بلوط', category: 'أثاث', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, title: 'مكتب إداري', category: 'الأثاث المكتبي', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop' },
    { id: 6, title: 'ديكور جداري', category: 'ديكورات', imageUrl: 'https://images.unsplash.com/photo-1617104424032-b9bd6972d0e4?q=80&w=2070&auto=format&fit=crop' },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/products');
        if (response.data && response.data.length > 0) {
          const formatted = response.data.map(p => ({
            id: p.id,
            title: p.name,
            category: p.category,
            imageUrl: p.images && p.images.length > 0 ? p.images[0].url : 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop'
          }));
          setProjects(formatted);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.log('Using fallback projects data');
        setProjects(fallbackProjects);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['الكل', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === 'الكل' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-[#0a0705]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            معرض <span className="text-[#D4AF37]">أعمالنا</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"
          ></motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                  filter === cat 
                  ? 'bg-[#D4AF37] text-[#0f0a08] border-[#D4AF37] font-bold' 
                  : 'bg-transparent text-gray-400 border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Masonry-like Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative h-80 overflow-hidden rounded-sm cursor-pointer"
                onClick={() => setSelectedImage(project.imageUrl)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a08]/90 via-[#0f0a08]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#D4AF37] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.category}
                  </p>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 transform scale-50 group-hover:scale-100">
                    <Maximize2 size={40} className="drop-shadow-lg" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-[#D4AF37] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
