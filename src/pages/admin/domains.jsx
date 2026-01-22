import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, User, LogOut, Users, ArrowLeft, Check, X } from 'lucide-react';
import { deleteCookie } from '../../utils/cookies';
import { useDomain } from '../../hooks/useDomain';
import { useUser } from '../../hooks/useUser';
import GoogleAd from '../../components/GoogleAd';

export default function DomainsPage() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [localError, setLocalError] = useState('');

  const { domains, isLoading, error: domainError, assignDomain, refetch } = useDomain();
  const { users } = useUser();
  React.useEffect(() => {
    refetch();
  }, []);

  const handleAssignClick = (domain) => {
    setSelectedDomain(domain);
    setSelectedUserId(domain.userId || '');
    setShowAssignModal(true);
    setLocalError('');
  };

  const handleAssign = async () => {
    if (!selectedDomain || !selectedUserId) {
      setLocalError('Please select a user');
      return;
    }

    setLocalError('');
    const result = await assignDomain(selectedDomain.id, parseInt(selectedUserId));

    if (result.success) {
      setShowAssignModal(false);
      setSelectedDomain(null);
      setSelectedUserId('');
    } else {
      setLocalError(result.error || 'Failed to assign domain');
    }
  };

  const handleCancel = () => {
    setShowAssignModal(false);
    setSelectedDomain(null);
    setSelectedUserId('');
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
  const adminEmail = userData.email || 'Admin';
  const adminName = userData.name || 'Admin User';

  const error = localError || domainError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
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

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Domains Management</h1>
          </div>
          <p className="text-slate-400">View and manage all domains created by users</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-center gap-3 text-red-300">
            <span className="text-sm">{error}</span>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Assigned User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Created At</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading domains...</span>
                      </div>
                    </td>
                  </tr>
                ) : domains.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                      No domains found.
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
                        {domain.user ? (
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-slate-400" />
                            <div>
                              <div className="text-slate-300">{domain.user.name}</div>
                              <div className="text-xs text-slate-400">{domain.user.email}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500">Unassigned</span>
                        )}
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
                        <button
                          onClick={() => handleAssignClick(domain)}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition px-3 py-1 rounded-lg hover:bg-blue-900/20"
                          title="Assign Domain"
                        >
                          <User size={16} />
                          <span>Assign</span>
                        </button>
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
            <p className="text-slate-400 text-sm">Assigned</p>
            <p className="text-3xl font-bold text-blue-400">
              {domains.filter(d => d.user).length}
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

      {/* Assign Domain Modal */}
      {showAssignModal && selectedDomain && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Assign Domain</h2>
            
            <div className="mb-4">
              <p className="text-slate-400 text-sm mb-2">Domain:</p>
              <p className="text-white font-medium">{selectedDomain.domainName}</p>
            </div>

            {localError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-300 text-sm">
                {localError}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Assign to User
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAssign}
                disabled={isLoading || !selectedUserId}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Assigning...</span>
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    <span>Assign</span>
                  </>
                )}
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

