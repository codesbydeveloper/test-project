import { useState } from 'react';
import axiosInstance from '../utils/axios';
import { setCookie } from '../utils/cookies';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success && response.data.data) {
        setCookie('token', response.data.data.token, 7); 
        
        const userData = response.data.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', userData.role || 'user');
        
        return {
          success: true,
          data: response.data.data,
          role: userData.role || 'user',
        };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'Invalid email or password';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

