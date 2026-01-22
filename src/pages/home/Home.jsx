import { useNavigate } from 'react-router-dom';
import { LogIn, Globe, Shield, ArrowRight } from 'lucide-react';
import GoogleAd from '../../components/GoogleAd';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to Admin Panel</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Manage your domains and users with our powerful admin dashboard
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Access</h3>
            <p className="text-slate-400">
              Secure authentication system with role-based access control
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Domain Management</h3>
            <p className="text-slate-400">
              Create, update, and manage domains with ease
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">User Management</h3>
            <p className="text-slate-400">
              Full CRUD operations for user management
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg shadow-blue-600/20"
          >
            <LogIn size={24} />
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Google AdSense Test Ad */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <GoogleAd 
              adSlot="6300978111"
              adFormat="auto"
              style={{ minHeight: '100px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

