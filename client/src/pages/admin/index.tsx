import React from 'react';
import { Route, Switch } from 'wouter';
import AdminLayout from './layout';
import AdminDashboard from './dashboard';
import AdminProducts from './products';
import AdminOrders from './orders';
import AdminContent from './content';
import AdminInquiries from './inquiries';
import AdminReviews from './reviews';
import AdminAppointments from './appointments';
import AdminAnalytics from './analytics';
import AdminSettings from './settings';

export default function AdminRouter() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin/content" component={AdminContent} />
        <Route path="/admin/inquiries" component={AdminInquiries} />
        <Route path="/admin/reviews" component={AdminReviews} />
        <Route path="/admin/appointments" component={AdminAppointments} />
        <Route path="/admin/analytics" component={AdminAnalytics} />
        <Route path="/admin/settings" component={AdminSettings} />
      </Switch>
    </AdminLayout>
  );
}