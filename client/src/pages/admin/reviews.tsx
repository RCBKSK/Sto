import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Search, Star, Eye, Check, X, Trash2 } from 'lucide-react';

interface CustomerReview {
  id: number;
  productId: number | null;
  customerName: string;
  email: string;
  rating: number;
  title: string | null;
  comment: string | null;
  images: string[] | null;
  verified: boolean;
  createdAt: string;
}

export default function AdminReviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingReview, setViewingReview] = useState<CustomerReview | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch reviews
  const { data: reviews, isLoading } = useQuery<CustomerReview[]>({
    queryKey: ['/api/admin/reviews'],
  });

  // Update review verification mutation
  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, verified }: { id: number; verified: boolean }) => {
      return await apiRequest(`/api/admin/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ verified }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/reviews'] });
      toast({
        title: 'Success',
        description: 'Review updated successfully!',
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

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/reviews'] });
      toast({
        title: 'Success',
        description: 'Review deleted successfully!',
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

  const handleVerifyReview = (id: number, verified: boolean) => {
    updateReviewMutation.mutate({ id, verified });
  };

  const handleDeleteReview = (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteReviewMutation.mutate(id);
    }
  };

  // Filter reviews
  const filteredReviews = reviews?.filter(review => {
    const matchesSearch = 
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review.title && review.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (review.comment && review.comment.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'verified' && review.verified) ||
      (statusFilter === 'unverified' && !review.verified);
    
    return matchesSearch && matchesRating && matchesStatus;
  }) || [];

  const renderStars = (rating: number, size = 'w-4 h-4') => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
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
          <h1 className="text-3xl font-bold tracking-tight">Customer Reviews</h1>
          <p className="text-muted-foreground">
            Manage customer reviews and testimonials
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAverageRating()}</div>
            <div className="mt-1">
              {renderStars(Math.round(parseFloat(getAverageRating())))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews?.filter(r => r.verified).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews?.filter(r => !r.verified).length || 0}
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
              <Label htmlFor="search">Search Reviews</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by customer name, email, or review content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="rating">Rating</Label>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>
            {filteredReviews.length} review(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold">{review.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{review.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="font-medium">{review.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={review.verified ? 'default' : 'secondary'}>
                      {review.verified ? 'Verified' : 'Unverified'}
                    </Badge>
                    {review.productId && (
                      <Badge variant="outline">Product #{review.productId}</Badge>
                    )}
                  </div>
                </div>

                {review.title && (
                  <h4 className="font-medium">{review.title}</h4>
                )}

                {review.comment && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm">{review.comment}</p>
                  </div>
                )}

                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={review.verified}
                        onCheckedChange={(checked) => handleVerifyReview(review.id, checked)}
                      />
                      <Label>Verified</Label>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewingReview(review)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || ratingFilter !== 'all' || statusFilter !== 'all'
                    ? 'Try adjusting your search criteria'
                    : 'No customer reviews have been submitted yet'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Review Dialog */}
      <Dialog open={!!viewingReview} onOpenChange={(open) => !open && setViewingReview(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Complete review information
            </DialogDescription>
          </DialogHeader>
          {viewingReview && (
            <div className="space-y-6">
              {/* Customer & Review Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {viewingReview.customerName}</p>
                    <p><strong>Email:</strong> {viewingReview.email}</p>
                    <p><strong>Status:</strong> {viewingReview.verified ? 'Verified' : 'Unverified'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Review Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Date:</strong> {new Date(viewingReview.createdAt).toLocaleDateString()}</p>
                    <p><strong>Product ID:</strong> {viewingReview.productId || 'General'}</p>
                    <div className="flex items-center space-x-2">
                      <strong>Rating:</strong>
                      {renderStars(viewingReview.rating)}
                      <span>{viewingReview.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Title */}
              {viewingReview.title && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Review Title</h4>
                  <p className="text-lg font-medium">{viewingReview.title}</p>
                </div>
              )}

              {/* Review Comment */}
              {viewingReview.comment && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Review Comment</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{viewingReview.comment}</p>
                  </div>
                </div>
              )}

              {/* Review Images */}
              {viewingReview.images && viewingReview.images.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Review Images</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {viewingReview.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={viewingReview.verified}
                    onCheckedChange={(checked) => {
                      handleVerifyReview(viewingReview.id, checked);
                      setViewingReview({ ...viewingReview, verified: checked });
                    }}
                  />
                  <Label>Verified Review</Label>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setViewingReview(null)}>
                    Close
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleDeleteReview(viewingReview.id);
                      setViewingReview(null);
                    }}
                  >
                    Delete Review
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}