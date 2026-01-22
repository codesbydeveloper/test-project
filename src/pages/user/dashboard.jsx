import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Plus, LogOut, User, Trash2, Edit, X, Check } from 'lucide-react';
import { deleteCookie } from '../../utils/cookies';
import { useDomain } from '../../hooks/useDomain';
import GoogleAd from '../../components/GoogleAd';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [domainName, setDomainName] = useState('');
  const [status, setStatus] = useState('active');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [localError, setLocalError] = useState('');

  const { domains, isLoading, error: domainError, createDomain, updateDomain, deleteDomain, fetchUserDomains } = useDomain();

  // Override the auto-fetch to use user's domains instead of all domains
  React.useEffect(() => {
    fetchUserDomains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!domainName.trim()) {
      setLocalError('Domain name is required');
      return;
    }

    setLocalError('');
    
    if (editingId) {
      // Update domain
      const result = await updateDomain(editingId, domainName.trim(), status);
      if (result.success) {
        setDomainName('');
        setStatus('active');
        setEditingId(null);
        setShowForm(false);
        fetchUserDomains(); // Refresh the list
      } else {
        setLocalError(result.error || 'Failed to update domain');
      }
    } else {
      // Create domain
      const result = await createDomain(domainName.trim(), status);
      if (result.success) {
        setDomainName('');
        setStatus('active');
        setShowForm(false);
        fetchUserDomains(); // Refresh the list
      } else {
        setLocalError(result.error || 'Failed to create domain');
      }
    }
  };

  const handleEdit = (domain) => {
    setDomainName(domain.domainName);
    setStatus(domain.status || 'active');
    setEditingId(domain.id);
    setShowForm(true);
    setLocalError('');
  };

  const handleDelete = async (domainId) => {
    if (window.confirm('Are you sure you want to delete this domain?')) {
      const result = await deleteDomain(domainId);
      if (!result.success) {
        setLocalError(result.error || 'Failed to delete domain');
      }
    }
  };

  const handleCancel = () => {
    setDomainName('');
    setStatus('active');
    setEditingId(null);
    setShowForm(false);
    setLocalError('');
  };

  const handleLogout = () => {
    deleteCookie('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = userData.email || 'User';
  const userName = userData.name || 'User';

  const error = localError || domainError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold text-white">My Domains</h1>
            </div>
            <p className="text-slate-400">Create and manage your domains</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-700/50"
            >
              <User size={18} />
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-slate-400">{userEmail}</span>
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-center gap-3 text-red-300">
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Create/Edit Domain Form */}
        <div className="mb-6">
          <button
            onClick={() => {
              if (showForm) {
                handleCancel();
              } else {
                setShowForm(true);
              }
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Create New Domain'}
          </button>
        </div>

        {showForm && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingId ? 'Edit Domain' : 'Create New Domain'}
            </h2>
            
            {localError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-300 text-sm">
                {localError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    placeholder="example.com"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 text-white placeholder-slate-500 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{editingId ? 'Updating...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>{editingId ? 'Update Domain' : 'Create Domain'}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Domains Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700 border-b border-slate-600">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Domain Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Created At</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading domains...</span>
                      </div>
                    </td>
                  </tr>
                ) : domains.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                      No domains yet. Click "Create New Domain" to create one.
                    </td>
                  </tr>
                ) : (
                  domains.map((domain) => (
                    <tr
                      key={domain.id}
                      className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-slate-300">{domain.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-300 font-medium">
                        {domain.domainName}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            domain.status === 'active'
                              ? 'bg-green-900/50 text-green-300'
                              : 'bg-red-900/50 text-red-300'
                          }`}
                        >
                          {domain.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(domain.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(domain)}
                            className="text-blue-400 hover:text-blue-300 transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(domain.id)}
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

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Total Domains</p>
            <p className="text-3xl font-bold text-white">{domains.length}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Active</p>
            <p className="text-3xl font-bold text-green-400">
              {domains.filter(d => d.status === 'active').length}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Inactive</p>
            <p className="text-3xl font-bold text-red-400">
              {domains.filter(d => d.status !== 'active').length}
            </p>
          </div>
        </div>

        {/* Google AdSense Test Ad */}
        <div className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-4">
          <GoogleAd 
            adSlot="6300978111"
            adFormat="auto"
            style={{ minHeight: '100px' }}
          />
        </div>
      </div>
    </div>
  );
}

