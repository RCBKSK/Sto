import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface CMSContextType {
  isEditMode: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  toggleEditMode: () => void;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  updateContent: (
    pageName: string,
    sectionKey: string,
    content: string,
    options?: {
      title?: string;
      sectionType?: string;
      mediaUrl?: string;
    }
  ) => Promise<void>;
  getContent: (pageName: string, sectionKey: string) => string | null;
  contents: Record<string, any>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/me');
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setIsAdmin(data.isAdmin || false);
        }
      } catch (error) {
        console.log('Not authenticated');
      }
    };
    checkAuth();
  }, []);

  // Fetch all page contents
  const { data: contentsData = [] } = useQuery({
    queryKey: ['/api/admin/page-content'],
    enabled: true,
  });

  // Create contents lookup object
  const contents = React.useMemo(() => {
    const lookup: Record<string, any> = {};
    contentsData.forEach((item: any) => {
      const key = `${item.pageName}_${item.sectionKey}_${item.language || 'en'}`;
      lookup[key] = item;
    });
    return lookup;
  }, [contentsData]);

  const updateContentMutation = useMutation({
    mutationFn: async ({
      pageName,
      sectionKey,
      content,
      options = {},
    }: {
      pageName: string;
      sectionKey: string;
      content: string;
      options?: any;
    }) => {
      const key = `${pageName}_${sectionKey}_en`;
      const existing = contents[key];

      if (existing) {
        // Update existing content
        return apiRequest(`/api/admin/page-content/${existing.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            content,
            title: options.title,
            mediaUrl: options.mediaUrl,
          }),
        });
      } else {
        // Create new content
        return apiRequest('/api/admin/page-content', {
          method: 'POST',
          body: JSON.stringify({
            pageName,
            sectionKey,
            sectionType: options.sectionType || 'text',
            content,
            title: options.title,
            mediaUrl: options.mediaUrl,
            language: 'en',
            isPublished: true,
          }),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/page-content'] });
      toast({
        title: "Content Updated",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Save Failed",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleEditMode = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to edit content.",
        variant: "destructive",
      });
      return;
    }
    setIsEditMode(!isEditMode);
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setIsAdmin(data.isAdmin || false);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsEditMode(false);
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateContent = async (
    pageName: string,
    sectionKey: string,
    content: string,
    options?: any
  ) => {
    return updateContentMutation.mutateAsync({
      pageName,
      sectionKey,
      content,
      options,
    });
  };

  const getContent = (pageName: string, sectionKey: string, language: string = 'en') => {
    const key = `${pageName}_${sectionKey}_${language}`;
    return contents[key]?.content || null;
  };

  return (
    <CMSContext.Provider
      value={{
        isEditMode,
        isAdmin,
        isAuthenticated,
        toggleEditMode,
        login,
        logout,
        updateContent,
        getContent,
        contents,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}