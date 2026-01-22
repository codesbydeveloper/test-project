import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

export function useDomain() {
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDomains = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/domains/all');
      
      if (response.data.success && response.data.data) {
        const domainsList = response.data.data.domains || [];
        setDomains(domainsList);
        return {
          success: true,
          data: domainsList,
          count: response.data.count || domainsList.length,
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch domains');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch domains';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const createDomain = async (domainName, status = 'active') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/domains/my-domains', {
        domainName,
        status,
      });

      if (response.data.success && response.data.data) {
        const newDomain = response.data.data.domain || response.data.data;
        setDomains([...domains, newDomain]);
        return {
          success: true,
          data: newDomain,
          message: response.data.message || 'Domain created successfully',
        };
      } else {
        throw new Error(response.data.message || 'Failed to create domain');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to create domain';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDomains = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/domains/my-domains');
      
      if (response.data.success && response.data.data) {
        const domainsList = Array.isArray(response.data.data) 
          ? response.data.data 
          : response.data.data.domains || [];
        setDomains(domainsList);
        return {
          success: true,
          data: domainsList,
        };
      } else {
        throw new Error(response.data.message || 'Failed to fetch domains');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch domains';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateDomain = async (domainId, domainName, status) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/domains/${domainId}`, {
        domainName,
        status,
      });

      if (response.data.success && response.data.data) {
        const updatedDomain = response.data.data.domain || response.data.data;
        setDomains(domains.map(domain => 
          domain.id === domainId ? updatedDomain : domain
        ));
        return {
          success: true,
          data: updatedDomain,
          message: response.data.message || 'Domain updated successfully',
        };
      } else {
        throw new Error(response.data.message || 'Failed to update domain');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to update domain';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDomain = async (domainId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete(`/domains/${domainId}`);

      if (response.data.success) {
        setDomains(domains.filter(domain => domain.id !== domainId));
        return {
          success: true,
          message: response.data.message || 'Domain deleted successfully',
        };
      } else {
        throw new Error(response.data.message || 'Failed to delete domain');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete domain';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const assignDomain = async (domainId, userId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/domains/assign', {
        domainId,
        userId,
      });

      if (response.data.success && response.data.data) {
        const updatedDomain = response.data.data.domain;
        setDomains(domains.map(domain => 
          domain.id === domainId ? updatedDomain : domain
        ));
        return {
          success: true,
          data: updatedDomain,
          message: response.data.message || 'Domain assigned successfully',
        };
      } else {
        throw new Error(response.data.message || 'Failed to assign domain');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to assign domain';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    domains,
    isLoading,
    error,
    createDomain,
    updateDomain,
    deleteDomain,
    assignDomain,
    fetchUserDomains,
    refetch: fetchDomains,
  };
}

