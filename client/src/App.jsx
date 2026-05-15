import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminProducts from './pages/admin/AdminProducts';
import AdminMessages from './pages/admin/AdminMessages';
import GoogleAuthCallback from './pages/admin/GoogleAuthCallback';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/auth/google" element={<GoogleAuthCallback />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </Router>
  );
}

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
