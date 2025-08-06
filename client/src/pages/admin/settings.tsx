import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Save, Settings, Globe, CreditCard, Bell, Shield, Database } from 'lucide-react';

interface AdminSettings {
  id: number;
  siteName: string;
  siteDescription: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  businessHours: string | null;
  address: string | null;
  currency: string;
  taxRate: string;
  shippingRate: string;
  freeShippingThreshold: string | null;
  maintenanceMode: boolean;
  updatedAt: string;
}

interface PaymentMethod {
  id: number;
  name: string;
  type: string;
  isEnabled: boolean;
  config: string | null;
  processingFee: string;
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState<Partial<AdminSettings>>({});
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    inquiryNotifications: true,
    lowStockAlerts: true,
    systemAlerts: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch admin settings
  const { data: settings, isLoading: settingsLoading } = useQuery<AdminSettings>({
    queryKey: ['/api/admin/settings'],
  });

  // Fetch payment methods
  const { data: paymentMethods, isLoading: paymentsLoading } = useQuery<PaymentMethod[]>({
    queryKey: ['/api/admin/payment-methods'],
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (data: Partial<AdminSettings>) => {
      return await apiRequest('/api/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/settings'] });
      toast({
        title: 'Success',
        description: 'Settings updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update payment method mutation
  const updatePaymentMethodMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<PaymentMethod> }) => {
      return await apiRequest(`/api/admin/payment-methods/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/payment-methods'] });
      toast({
        title: 'Success',
        description: 'Payment method updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  React.useEffect(() => {
    if (settings) {
      setGeneralSettings(settings);
    }
  }, [settings]);

  const handleSaveGeneralSettings = () => {
    updateSettingsMutation.mutate(generalSettings);
  };

  const handlePaymentMethodToggle = (id: number, isEnabled: boolean) => {
    updatePaymentMethodMutation.mutate({ id, data: { isEnabled } });
  };

  // Mock data for demonstration
  const mockSettings: AdminSettings = {
    id: 1,
    siteName: 'Elegance Stone',
    siteDescription: 'Premium natural stone supplier specializing in cladding, tiles, and design solutions',
    contactEmail: 'info@elegancestone.com',
    contactPhone: '+1 (555) 123-4567',
    businessHours: 'Monday - Friday: 9AM - 6PM\nSaturday: 10AM - 4PM\nSunday: Closed',
    address: '123 Stone Avenue, Suite 100\nNew York, NY 10001',
    currency: 'USD',
    taxRate: '8.25',
    shippingRate: '15.00',
    freeShippingThreshold: '500.00',
    maintenanceMode: false,
    updatedAt: new Date().toISOString(),
  };

  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: 1,
      name: 'Stripe',
      type: 'stripe',
      isEnabled: true,
      config: null,
      processingFee: '2.9',
    },
    {
      id: 2,
      name: 'PayPal',
      type: 'paypal',
      isEnabled: true,
      config: null,
      processingFee: '3.5',
    },
    {
      id: 3,
      name: 'Bank Transfer',
      type: 'bank_transfer',
      isEnabled: false,
      config: null,
      processingFee: '0.0',
    },
  ];

  const currentSettings = settings || mockSettings;
  const currentPaymentMethods = paymentMethods || mockPaymentMethods;

  if (settingsLoading) {
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
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your website and business settings
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Business</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Payments</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic website information and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName || ''}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    placeholder="Enter site name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={generalSettings.currency || 'USD'}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription || ''}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  placeholder="Enter site description"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={generalSettings.maintenanceMode || false}
                  onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground ml-2">
                  Enable to show maintenance page to visitors
                </p>
              </div>

              <Button onClick={handleSaveGeneralSettings} disabled={updateSettingsMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {updateSettingsMutation.isPending ? 'Saving...' : 'Save General Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Contact details and business information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail || ''}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={generalSettings.contactPhone || ''}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={generalSettings.address || ''}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                  placeholder="Enter full business address"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Textarea
                  id="businessHours"
                  value={generalSettings.businessHours || ''}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, businessHours: e.target.value })}
                  placeholder="Monday - Friday: 9AM - 6PM"
                  rows={4}
                />
              </div>

              <Button onClick={handleSaveGeneralSettings} disabled={updateSettingsMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {updateSettingsMutation.isPending ? 'Saving...' : 'Save Business Settings'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Shipping</CardTitle>
              <CardDescription>
                Configure tax rates and shipping options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={generalSettings.taxRate || ''}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, taxRate: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingRate">Shipping Rate ($)</Label>
                  <Input
                    id="shippingRate"
                    type="number"
                    step="0.01"
                    value={generalSettings.shippingRate || ''}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, shippingRate: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    step="0.01"
                    value={generalSettings.freeShippingThreshold || ''}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, freeShippingThreshold: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <Button onClick={handleSaveGeneralSettings} disabled={updateSettingsMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {updateSettingsMutation.isPending ? 'Saving...' : 'Save Pricing Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure available payment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPaymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Processing fee: {method.processingFee}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={method.isEnabled}
                        onCheckedChange={(checked) => handlePaymentMethodToggle(method.id, checked)}
                      />
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Order Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new orders are placed
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, orderNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Customer Inquiries</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new customer inquiries
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.inquiryNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, inquiryNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Low Stock Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Get alerted when products are running low
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.lowStockAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, lowStockAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">System Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Important system notifications and updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                    }
                  />
                </div>
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                System status and maintenance options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Database Status</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Connected</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Last Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Create Database Backup
                </Button>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Export Settings
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}