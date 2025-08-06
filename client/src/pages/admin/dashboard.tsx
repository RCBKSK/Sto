import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package, 
  MessageSquare, 
  Star,
  Calendar,
  Eye,
  ArrowUpRight
} from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  pendingInquiries: number;
  newReviews: number;
  conversionRate: number;
  avgOrderValue: number;
}

interface RecentOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  total: string;
  status: string;
  createdAt: string;
}

interface RecentActivity {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('30days');

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/admin/dashboard/stats', timeRange],
  });

  // Fetch recent orders
  const { data: recentOrders, isLoading: ordersLoading } = useQuery<RecentOrder[]>({
    queryKey: ['/api/admin/dashboard/recent-orders'],
  });

  // Fetch recent activity
  const { data: recentActivity, isLoading: activityLoading } = useQuery<RecentActivity[]>({
    queryKey: ['/api/admin/dashboard/recent-activity'],
  });

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 12400, orders: 45 },
    { month: 'Feb', revenue: 15600, orders: 62 },
    { month: 'Mar', revenue: 18200, orders: 78 },
    { month: 'Apr', revenue: 21800, orders: 85 },
    { month: 'May', revenue: 24500, orders: 92 },
    { month: 'Jun', revenue: 28300, orders: 108 },
  ];

  const trafficData = [
    { date: '2024-01-01', visitors: 120, pageViews: 340 },
    { date: '2024-01-02', visitors: 150, pageViews: 420 },
    { date: '2024-01-03', visitors: 180, pageViews: 510 },
    { date: '2024-01-04', visitors: 200, pageViews: 580 },
    { date: '2024-01-05', visitors: 170, pageViews: 460 },
    { date: '2024-01-06', visitors: 220, pageViews: 620 },
    { date: '2024-01-07', visitors: 250, pageViews: 680 },
  ];

  // Mock stats if not loaded
  const currentStats: DashboardStats = stats || {
    totalOrders: 248,
    totalRevenue: 28300,
    totalUsers: 1240,
    totalProducts: 85,
    pendingInquiries: 12,
    newReviews: 8,
    conversionRate: 2.9,
    avgOrderValue: 450
  };

  // Mock recent orders
  const currentOrders: RecentOrder[] = recentOrders || [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customerName: 'John Doe',
      total: '450.00',
      status: 'processing',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customerName: 'Jane Smith',
      total: '320.00',
      status: 'completed',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customerName: 'Mike Johnson',
      total: '780.00',
      status: 'shipped',
      createdAt: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  // Mock recent activity
  const currentActivity: RecentActivity[] = recentActivity || [
    {
      id: 1,
      type: 'order',
      title: 'New order received',
      description: 'Order #ORD-001 from John Doe',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'inquiry',
      title: 'New customer inquiry',
      description: 'Quote request for Calacatta Gold marble',
      timestamp: new Date(Date.now() - 1800000).toISOString()
    },
    {
      id: 3,
      type: 'review',
      title: 'New review received',
      description: '5-star review for Verde Guatemala',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'shipped': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingCart;
      case 'inquiry': return MessageSquare;
      case 'review': return Star;
      default: return Package;
    }
  };

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with Elegance Stone.
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 text-green-600 mr-1" />
              <span className="text-green-600">+15.4%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 text-green-600 mr-1" />
              <span className="text-green-600">+12.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 text-green-600 mr-1" />
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline w-3 h-3 text-red-600 mr-1" />
              <span className="text-red-600">-0.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
            <CardDescription>Monthly performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value}` : value, 
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]} 
                />
                <Bar dataKey="revenue" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View Pending Orders
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Check Inquiries
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Star className="w-4 h-4 mr-2" />
              Moderate Reviews
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Orders */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <Badge variant={getStatusColor(order.status)} className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-4">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentActivity.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-center space-x-3 border-b pb-3 last:border-b-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Total catalog items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.pendingInquiries}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.newReviews}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentStats.avgOrderValue}</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}