import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Calendar, ArrowLeft, LogOut } from 'lucide-react';
import { deleteCookie } from '../../utils/cookies';
import { useProfile } from '../../hooks/useProfile';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfile();

  const handleLogout = () => {
    deleteCookie('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleBack = () => {
    const role = localStorage.getItem('userRole');
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md w-full">
          <div className="text-center">
            <div className="text-red-400 mb-4">Error loading profile</div>
            <p className="text-slate-400 text-sm mb-4">{error}</p>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition mx-auto"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRoleBadgeColor = (role) => {
    return role === 'admin'
      ? 'bg-purple-900/50 text-purple-300'
      : 'bg-blue-900/50 text-blue-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
                      profile.role
                    )}`}
                  >
                    {profile.role?.toUpperCase() || 'USER'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
            
            <div className="space-y-6">
              {/* User ID */}
              <div className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">User ID</p>
                  <p className="text-white font-medium">{profile.id}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Email Address</p>
                  <p className="text-white font-medium">{profile.email}</p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Role</p>
                  <p className="text-white font-medium capitalize">{profile.role || 'user'}</p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Member Since</p>
                  <p className="text-white font-medium">{formatDate(profile.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Account Status</p>
              <p className="text-green-400 font-medium">Active</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Account Type</p>
              <p className="text-white font-medium capitalize">{profile.role || 'user'} Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

