import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Eye, Package, Star } from 'lucide-react';

interface AnalyticsData {
  revenue: { month: string; amount: number }[];
  orders: { month: string; count: number }[];
  visitors: { date: string; visitors: number; pageViews: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
  topPages: { page: string; views: number; bounceRate: number }[];
  customerSegments: { segment: string; count: number; value: number }[];
  conversionFunnel: { stage: string; count: number; rate: number }[];
}

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#f97316'];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30days');
  const [activeChart, setActiveChart] = useState('revenue');

  // Fetch analytics data
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['/api/admin/analytics', timeRange],
  });

  // Mock data for demonstration
  const mockAnalytics: AnalyticsData = {
    revenue: [
      { month: 'Jan', amount: 12400 },
      { month: 'Feb', amount: 15600 },
      { month: 'Mar', amount: 18200 },
      { month: 'Apr', amount: 21800 },
      { month: 'May', amount: 24500 },
      { month: 'Jun', amount: 28300 },
    ],
    orders: [
      { month: 'Jan', count: 45 },
      { month: 'Feb', count: 62 },
      { month: 'Mar', count: 78 },
      { month: 'Apr', count: 85 },
      { month: 'May', count: 92 },
      { month: 'Jun', count: 108 },
    ],
    visitors: [
      { date: '2024-01-01', visitors: 120, pageViews: 340 },
      { date: '2024-01-02', visitors: 150, pageViews: 420 },
      { date: '2024-01-03', visitors: 180, pageViews: 510 },
      { date: '2024-01-04', visitors: 200, pageViews: 580 },
      { date: '2024-01-05', visitors: 170, pageViews: 460 },
      { date: '2024-01-06', visitors: 220, pageViews: 620 },
      { date: '2024-01-07', visitors: 250, pageViews: 680 },
    ],
    topProducts: [
      { name: 'Bianco Rhino', sales: 45, revenue: 4005 },
      { name: 'Milano White', sales: 38, revenue: 9120 },
      { name: 'Calacatta Gold', sales: 32, revenue: 2848 },
      { name: 'Verde Guatemala', sales: 28, revenue: 8120 },
      { name: 'Picasso Grey', sales: 15, revenue: 90000 },
    ],
    topPages: [
      { page: '/', views: 2840, bounceRate: 32 },
      { page: '/products', views: 1950, bounceRate: 28 },
      { page: '/contact', views: 1240, bounceRate: 45 },
      { page: '/services', views: 890, bounceRate: 38 },
      { page: '/gallery', views: 720, bounceRate: 52 },
    ],
    customerSegments: [
      { segment: 'Residential', count: 45, value: 125000 },
      { segment: 'Commercial', count: 28, value: 180000 },
      { segment: 'Contractors', count: 35, value: 95000 },
      { segment: 'Architects', count: 18, value: 75000 },
    ],
    conversionFunnel: [
      { stage: 'Visitors', count: 5420, rate: 100 },
      { stage: 'Product Views', count: 2180, rate: 40.2 },
      { stage: 'Add to Cart', count: 654, rate: 12.1 },
      { stage: 'Checkout', count: 234, rate: 4.3 },
      { stage: 'Purchase', count: 156, rate: 2.9 },
    ],
  };

  const data = analytics || mockAnalytics;

  if (isLoading) {
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
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track performance metrics and business insights
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
            <div className="text-2xl font-bold">$28,300</div>
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
            <div className="text-2xl font-bold">108</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 text-green-600 mr-1" />
              <span className="text-green-600">+17.4%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,420</div>
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
            <div className="text-2xl font-bold">2.9%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline w-3 h-3 text-red-600 mr-1" />
              <span className="text-red-600">-0.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Controls */}
      <div className="flex space-x-2">
        <Button
          variant={activeChart === 'revenue' ? 'default' : 'outline'}
          onClick={() => setActiveChart('revenue')}
        >
          Revenue Trends
        </Button>
        <Button
          variant={activeChart === 'orders' ? 'default' : 'outline'}
          onClick={() => setActiveChart('orders')}
        >
          Order Volume
        </Button>
        <Button
          variant={activeChart === 'visitors' ? 'default' : 'outline'}
          onClick={() => setActiveChart('visitors')}
        >
          Website Traffic
        </Button>
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {activeChart === 'revenue' && 'Revenue Trends'}
              {activeChart === 'orders' && 'Order Volume'}
              {activeChart === 'visitors' && 'Website Traffic'}
            </CardTitle>
            <CardDescription>
              {activeChart === 'revenue' && 'Monthly revenue performance'}
              {activeChart === 'orders' && 'Number of orders over time'}
              {activeChart === 'visitors' && 'Daily website visitors and page views'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {activeChart === 'revenue' && (
                <BarChart data={data.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Bar dataKey="amount" fill="#f59e0b" />
                </BarChart>
              )}
              {activeChart === 'orders' && (
                <LineChart data={data.orders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              )}
              {activeChart === 'visitors' && (
                <LineChart data={data.visitors}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="pageViews" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Revenue by customer type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.customerSegments}
                  dataKey="value"
                  nameKey="segment"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ segment, value }: any) => `${segment}: $${value.toLocaleString()}`}
                >
                  {data.customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`$${value}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best selling products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">#{index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Website Pages</CardTitle>
            <CardDescription>Most visited pages and bounce rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPages.map((page) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{page.page}</p>
                      <p className="text-sm text-muted-foreground">
                        Bounce rate: {page.bounceRate}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{page.views.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>Customer journey from visitor to purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.conversionFunnel} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" width={100} />
              <Tooltip formatter={(value, name) => [value, name === 'count' ? 'Count' : 'Rate']} />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-5 gap-4 text-center">
            {data.conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="space-y-1">
                <p className="text-sm font-medium">{stage.stage}</p>
                <p className="text-2xl font-bold">{stage.count.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{stage.rate}%</p>
                {index < data.conversionFunnel.length - 1 && (
                  <div className="text-xs text-red-600">
                    -{(data.conversionFunnel[index].count - data.conversionFunnel[index + 1].count).toLocaleString()} lost
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}