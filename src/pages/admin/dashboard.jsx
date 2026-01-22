import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus, LogOut, User, Globe } from 'lucide-react';
import UserAdd from './_components/UserAdd';
import { deleteCookie } from '../../utils/cookies';
import { useUser } from '../../hooks/useUser';
import GoogleAd from '../../components/GoogleAd';

export default function AdminUI() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [localError, setLocalError] = useState('');

  const { users, isLoading, error: userError, createUser, updateUser, deleteUser } = useUser();

  const handleAdd = async () => {
    if (!formData.name || !formData.email) {
      setLocalError('Name and email are required');
      return;
    }

    if (!editingId && !formData.password) {
      setLocalError('Password is required');
      return;
    }

    setLocalError('');

    if (editingId) {
      const result = await updateUser(editingId, formData);
      if (result.success) {
        setFormData({ name: '', email: '', password: '', role: 'user' });
        setEditingId(null);
        setShowForm(false);
      } else {
        setLocalError(result.error || 'Failed to update user');
      }
    } else {
      const result = await createUser(formData);
      if (result.success) {
        setFormData({ name: '', email: '', password: '', role: 'user' });
        setShowForm(false);
      } else {
        setLocalError(result.error || 'Failed to create user');
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || '',
      email: item.email || '',
      password: '',
      role: item.role || 'user',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const result = await deleteUser(id);
      if (!result.success) {
        setLocalError(result.error || 'Failed to delete user');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', password: '', role: 'user' });
    setEditingId(null);
    setShowForm(false);
    setLocalError('');
  };

  const error = localError || userError;

  const handleLogout = () => {
    deleteCookie('token');
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    
    navigate('/login');
  };

  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const adminEmail = userData.email || 'Admin';
  const adminName = userData.name || 'Admin User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your data with CRUD operations</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-700/50"
            >
              <User size={18} />
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">{adminName}</span>
                <span className="text-xs text-slate-400">{adminEmail}</span>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add New User'}
          </button>
          <button
            onClick={() => navigate('/admin/domains')}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <Globe size={20} />
            View Domains
          </button>
        </div>

       <UserAdd 
         showForm={showForm} 
         formData={formData} 
         setFormData={setFormData} 
         handleAdd={handleAdd} 
         handleCancel={handleCancel} 
         editingId={editingId}
         isLoading={isLoading}
         error={error}
       />


        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700 border-b border-slate-600">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                      No users yet. Click "Add New User" to create one.
                    </td>
                  </tr>
                ) : (
                  users.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-slate-300">{item.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{item.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/50 text-blue-300">
                          {item.role || 'user'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-400 hover:text-blue-300 transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-400 hover:text-red-300 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-white">{users.length}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Admins</p>
            <p className="text-3xl font-bold text-blue-400">
              {users.filter(i => i.role === 'admin').length}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Regular Users</p>
            <p className="text-3xl font-bold text-green-400">
              {users.filter(i => i.role === 'user').length}
            </p>
          </div>
        </div>

        {/* Google AdSense Test Ad */}
        <div className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-4">
          <GoogleAd 
            adSlot="1234567890"
            adFormat="auto"
            style={{ minHeight: '100px' }}
          />
        </div>
      </div>
    </div>
  );
}
