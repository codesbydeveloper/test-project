import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

export function useUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/users');
      
      if (response.data.success && response.data.data) {
        const usersList = Array.isArray(response.data.data) 
          ? response.data.data 
          : response.data.data.users || [];
        setUsers(usersList);
        return {
          success: true,
          data: usersList,
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch users';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/users', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'user',
      });

      if (response.data.success && response.data.data) {
        const newUser = response.data.data.user || response.data.data;
        setUsers([...users, newUser]);
        return {
          success: true,
          data: newUser,
        };
      } else {
        throw new Error(response.data.message || 'Failed to create user');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to create user';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/users/${userId}`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'user',
      });

      if (response.data.success && response.data.data) {
        const updatedUser = response.data.data.user || response.data.data;
        setUsers(users.map(user => user.id === userId ? updatedUser : user));
        return {
          success: true,
          data: updatedUser,
        };
      } else {
        throw new Error(response.data.message || 'Failed to update user');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to update user';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete(`/users/${userId}`);

      if (response.data.success) {
        setUsers(users.filter(user => user.id !== userId));
        return {
          success: true,
          message: response.data.message || 'User deleted successfully',
        };
      } else {
        throw new Error(response.data.message || 'Failed to delete user');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete user';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
}

