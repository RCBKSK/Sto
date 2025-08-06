import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  MessageSquare, 
  Settings, 
  Users,
  BarChart3,
  Bell,
  LogOut,
  Menu,
  X,
  Star,
  Calendar
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, current: location === '/admin' },
    { name: 'Products', href: '/admin/products', icon: Package, current: location === '/admin/products' },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, current: location === '/admin/orders' },
    { name: 'Content', href: '/admin/content', icon: FileText, current: location === '/admin/content' },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare, current: location === '/admin/inquiries' },
    { name: 'Reviews', href: '/admin/reviews', icon: Star, current: location === '/admin/reviews' },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar, current: location === '/admin/appointments' },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, current: location === '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, current: location === '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <SidebarContent navigation={navigation} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent navigation={navigation} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
            </div>
            <div className="flex flex-1 justify-end items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <Badge className="absolute -mt-2 -ml-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white">
                  3
                </Badge>
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Admin</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

interface SidebarContentProps {
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ElementType;
    current: boolean;
  }>;
  onClose?: () => void;
}

function SidebarContent({ navigation, onClose }: SidebarContentProps) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ES</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Admin Panel</span>
        </Link>
        {onClose && (
          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5 text-gray-700"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                      item.current
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-gray-700 hover:text-amber-700 hover:bg-amber-50'
                    }`}
                    onClick={onClose}
                  >
                    <item.icon
                      className={`h-6 w-6 shrink-0 ${
                        item.current ? 'text-amber-700' : 'text-gray-400 group-hover:text-amber-700'
                      }`}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm">
                    <h4 className="font-semibold mb-2">Quick Stats</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Orders Today:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-medium">$2,840</span>
                      </div>
                      <div className="flex justify-between">
                        <span>New Inquiries:</span>
                        <span className="font-medium">5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Link
                href="/"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-amber-700"
              >
                <LogOut className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-amber-700" />
                Back to Website
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}