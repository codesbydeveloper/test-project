import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/auth/profile');
      
      if (response.data.success && response.data.data) {
        const userProfile = response.data.data.user || response.data.data;
        setProfile(userProfile);
        return {
          success: true,
          data: userProfile,
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch profile');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch profile';
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
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  };
}

