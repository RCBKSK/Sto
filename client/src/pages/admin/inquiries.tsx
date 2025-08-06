import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Search, Eye, Mail, Phone, Calendar, MessageSquare, Trash2 } from 'lucide-react';

interface ContactInquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  message: string;
  status?: string;
  createdAt: string;
}

export default function AdminInquiries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingInquiry, setViewingInquiry] = useState<ContactInquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch inquiries
  const { data: inquiries, isLoading } = useQuery<ContactInquiry[]>({
    queryKey: ['/api/contact'],
  });

  // Delete inquiry mutation
  const deleteInquiryMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/contact/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: 'Success',
        description: 'Inquiry deleted successfully!',
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

  // Send reply mutation (mock for now)
  const sendReplyMutation = useMutation({
    mutationFn: async ({ id, message }: { id: number; message: string }) => {
      // This would typically send an email
      console.log('Sending reply to inquiry', id, 'with message:', message);
      return Promise.resolve();
    },
    onSuccess: () => {
      setViewingInquiry(null);
      setReplyMessage('');
      toast({
        title: 'Success',
        description: 'Reply sent successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to send reply',
        variant: 'destructive',
      });
    },
  });

  const handleSendReply = () => {
    if (viewingInquiry && replyMessage.trim()) {
      sendReplyMutation.mutate({
        id: viewingInquiry.id,
        message: replyMessage
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      deleteInquiryMutation.mutate(id);
    }
  };

  // Filter inquiries
  const filteredInquiries = inquiries?.filter(inquiry => {
    const matchesSearch = 
      inquiry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'replied': return 'default';
      case 'pending': return 'secondary';
      case 'closed': return 'outline';
      default: return 'secondary';
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Customer Inquiries</h1>
          <p className="text-muted-foreground">
            Manage customer contact forms and inquiries
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiries?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inquiries?.filter(i => !i.status || i.status === 'pending').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Replied</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inquiries?.filter(i => i.status === 'replied').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inquiries?.filter(i => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(i.createdAt) > weekAgo;
              }).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Inquiries</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <Card>
        <CardHeader>
          <CardTitle>Inquiries</CardTitle>
          <CardDescription>
            {filteredInquiries.length} inquiry(ies) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <div key={inquiry.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold">
                        {inquiry.firstName} {inquiry.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(inquiry.createdAt).toLocaleDateString()} at{' '}
                        {new Date(inquiry.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{inquiry.email}</span>
                      {inquiry.phone && (
                        <>
                          <Phone className="w-4 h-4 ml-2" />
                          <span>{inquiry.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(inquiry.status)}>
                      {inquiry.status || 'pending'}
                    </Badge>
                    {inquiry.projectType && (
                      <Badge variant="outline">{inquiry.projectType}</Badge>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">{inquiry.message}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    Project Type: {inquiry.projectType || 'Not specified'}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewingInquiry(inquiry)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View & Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(inquiry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredInquiries.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No inquiries found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search criteria'
                    : 'No customer inquiries have been received yet'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View & Reply Dialog */}
      <Dialog open={!!viewingInquiry} onOpenChange={(open) => !open && setViewingInquiry(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Inquiry</DialogTitle>
            <DialogDescription>
              View details and send a reply
            </DialogDescription>
          </DialogHeader>
          {viewingInquiry && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {viewingInquiry.firstName} {viewingInquiry.lastName}</p>
                    <p><strong>Email:</strong> {viewingInquiry.email}</p>
                    {viewingInquiry.phone && (
                      <p><strong>Phone:</strong> {viewingInquiry.phone}</p>
                    )}
                    {viewingInquiry.projectType && (
                      <p><strong>Project Type:</strong> {viewingInquiry.projectType}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Inquiry Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Date:</strong> {new Date(viewingInquiry.createdAt).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {new Date(viewingInquiry.createdAt).toLocaleTimeString()}</p>
                    <p><strong>Status:</strong> {viewingInquiry.status || 'pending'}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h4 className="font-semibold">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{viewingInquiry.message}</p>
                </div>
              </div>

              {/* Reply Section */}
              <div className="space-y-2">
                <h4 className="font-semibold">Send Reply</h4>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={6}
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Reply will be sent to: {viewingInquiry.email}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setViewingInquiry(null)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSendReply} 
                      disabled={!replyMessage.trim() || sendReplyMutation.isPending}
                    >
                      {sendReplyMutation.isPending ? 'Sending...' : 'Send Reply'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}