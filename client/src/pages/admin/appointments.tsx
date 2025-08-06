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
import { Search, Calendar, Eye, Edit, Phone, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Appointment {
  id: number;
  customerName: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  preferredDate: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

export default function AdminAppointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingAppointment, setViewingAppointment] = useState<Appointment | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch appointments
  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ['/api/admin/appointments'],
  });

  // Update appointment mutation
  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await apiRequest(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/appointments'] });
      setEditingAppointment(null);
      setNewStatus('');
      toast({
        title: 'Success',
        description: 'Appointment updated successfully!',
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

  const handleUpdateAppointment = () => {
    if (editingAppointment && newStatus) {
      updateAppointmentMutation.mutate({
        id: editingAppointment.id,
        status: newStatus
      });
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setNewStatus(appointment.status);
  };

  const handleQuickStatusUpdate = (id: number, status: string) => {
    updateAppointmentMutation.mutate({ id, status });
  };

  // Filter appointments
  const filteredAppointments = appointments?.filter(appointment => {
    const matchesSearch = 
      appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.phone && appointment.phone.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const isUpcoming = (dateString: string | null) => {
    if (!dateString) return false;
    const appointmentDate = new Date(dateString);
    const now = new Date();
    return appointmentDate > now;
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
          <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
          <p className="text-muted-foreground">
            Manage customer appointments and consultations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments?.filter(a => a.status === 'pending').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments?.filter(a => a.status === 'confirmed').length || 0}
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
              {appointments?.filter(a => {
                if (!a.preferredDate) return false;
                const appointmentDate = new Date(a.preferredDate);
                const now = new Date();
                const weekFromNow = new Date();
                weekFromNow.setDate(now.getDate() + 7);
                return appointmentDate >= now && appointmentDate <= weekFromNow;
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
              <Label htmlFor="search">Search Appointments</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by customer name, email, or phone..."
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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>
            {filteredAppointments.length} appointment(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => {
              const StatusIcon = getStatusIcon(appointment.status);
              return (
                <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold">{appointment.customerName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{appointment.email}</span>
                          </div>
                          {appointment.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{appointment.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {appointment.preferredDate && (
                        <div className="text-center">
                          <p className="text-sm font-medium">
                            {new Date(appointment.preferredDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(appointment.preferredDate).toLocaleTimeString()}
                          </p>
                          {isUpcoming(appointment.preferredDate) && (
                            <Badge variant="outline" className="mt-1">Upcoming</Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(appointment.status)} className="flex items-center space-x-1">
                        <StatusIcon className="w-3 h-3" />
                        <span>{appointment.status}</span>
                      </Badge>
                      {appointment.projectType && (
                        <Badge variant="outline">{appointment.projectType}</Badge>
                      )}
                    </div>
                  </div>

                  {appointment.message && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm">{appointment.message}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                      Requested: {new Date(appointment.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      {appointment.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickStatusUpdate(appointment.id, 'confirmed')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickStatusUpdate(appointment.id, 'cancelled')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewingAppointment(appointment)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(appointment)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No appointments found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search criteria'
                    : 'No appointments have been scheduled yet'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Appointment Dialog */}
      <Dialog open={!!viewingAppointment} onOpenChange={(open) => !open && setViewingAppointment(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Complete appointment information
            </DialogDescription>
          </DialogHeader>
          {viewingAppointment && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {viewingAppointment.customerName}</p>
                    <p><strong>Email:</strong> {viewingAppointment.email}</p>
                    {viewingAppointment.phone && (
                      <p><strong>Phone:</strong> {viewingAppointment.phone}</p>
                    )}
                    {viewingAppointment.projectType && (
                      <p><strong>Project Type:</strong> {viewingAppointment.projectType}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Appointment Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Status:</strong> {viewingAppointment.status}</p>
                    <p><strong>Requested:</strong> {new Date(viewingAppointment.createdAt).toLocaleDateString()}</p>
                    {viewingAppointment.preferredDate && (
                      <>
                        <p><strong>Preferred Date:</strong> {new Date(viewingAppointment.preferredDate).toLocaleDateString()}</p>
                        <p><strong>Preferred Time:</strong> {new Date(viewingAppointment.preferredDate).toLocaleTimeString()}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Message */}
              {viewingAppointment.message && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Message</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{viewingAppointment.message}</p>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-2">
                  {viewingAppointment.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleQuickStatusUpdate(viewingAppointment.id, 'confirmed');
                          setViewingAppointment({ ...viewingAppointment, status: 'confirmed' });
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          handleQuickStatusUpdate(viewingAppointment.id, 'cancelled');
                          setViewingAppointment({ ...viewingAppointment, status: 'cancelled' });
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {viewingAppointment.status === 'confirmed' && (
                    <Button
                      size="sm"
                      onClick={() => {
                        handleQuickStatusUpdate(viewingAppointment.id, 'completed');
                        setViewingAppointment({ ...viewingAppointment, status: 'completed' });
                      }}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
                <Button variant="outline" onClick={() => setViewingAppointment(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Dialog */}
      <Dialog open={!!editingAppointment} onOpenChange={(open) => !open && setEditingAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Appointment</DialogTitle>
            <DialogDescription>
              Change appointment status
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Appointment Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingAppointment(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateAppointment} disabled={updateAppointmentMutation.isPending}>
                {updateAppointmentMutation.isPending ? 'Updating...' : 'Update Appointment'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}