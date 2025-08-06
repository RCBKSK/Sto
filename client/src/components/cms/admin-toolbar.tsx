import React, { useState } from 'react';
import { useCMS } from '@/contexts/cms-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Edit3,
  LogOut,
  Settings,
  Eye,
  EyeOff,
  User,
  Shield,
  Save,
  Monitor,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminToolbar() {
  const { isEditMode, isAdmin, isAuthenticated, toggleEditMode, logout } = useCMS();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border">
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            {/* Admin Status Badge */}
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                {isAdmin ? 'Admin' : 'User'}
              </Badge>
              
              <Badge 
                variant={isEditMode ? 'default' : 'secondary'} 
                className="text-xs"
              >
                <Monitor className="h-3 w-3 mr-1" />
                {isEditMode ? 'Edit Mode' : 'View Mode'}
              </Badge>
            </div>

            {/* Edit Mode Toggle */}
            <Button
              size="sm"
              variant={isEditMode ? 'default' : 'outline'}
              onClick={toggleEditMode}
              className={cn(
                'transition-all duration-200',
                isEditMode && 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              {isEditMode ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Exit Edit
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit Mode
                </>
              )}
            </Button>

            {/* Admin Panel Button */}
            {isAdmin && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open('/admin', '_blank')}
              >
                <Settings className="h-4 w-4 mr-1" />
                Admin Panel
              </Button>
            )}

            {/* Logout Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={logout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <Card className="bg-blue-600 text-white shadow-lg border-blue-500">
          <CardContent className="p-2">
            <div className="flex items-center space-x-2 text-sm">
              <Edit3 className="h-4 w-4" />
              <span className="font-medium">Click any text to edit</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface AdminLoginProps {
  children: React.ReactNode;
}

export function AdminLogin({ children }: AdminLoginProps) {
  const { login, isAuthenticated } = useCMS();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(credentials);
      setIsOpen(false);
      setCredentials({ username: '', password: '' });
    } catch (error) {
      // Error handling is done in the CMS context
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="bg-white/95 backdrop-blur-sm">
              <User className="h-4 w-4 mr-1" />
              Admin Login
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Admin Login</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}