import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Plus, Edit, Trash2, Save, FileText, Globe, Settings, Image } from 'lucide-react';

interface PageContent {
  id: number;
  pageName: string;
  title: string;
  content: string;
  metaDescription: string | null;
  isPublished: boolean;
  updatedAt: string;
}

interface SeoSettings {
  id: number;
  pageName: string;
  title: string;
  description: string | null;
  keywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  updatedAt: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  publishedAt: string | null;
}

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('pages');
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [editingSeo, setEditingSeo] = useState<SeoSettings | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showSeoDialog, setShowSeoDialog] = useState(false);
  const [showBlogDialog, setShowBlogDialog] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch page contents
  const { data: pages, isLoading: pagesLoading } = useQuery<PageContent[]>({
    queryKey: ['/api/admin/page-content'],
  });

  // Fetch SEO settings
  const { data: seoSettings, isLoading: seoLoading } = useQuery<SeoSettings[]>({
    queryKey: ['/api/admin/seo-settings'],
  });

  // Fetch blog posts
  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  // Page content mutations
  const updatePageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<PageContent> }) => {
      return await apiRequest(`/api/admin/page-content/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/page-content'] });
      setEditingPage(null);
      toast({
        title: 'Success',
        description: 'Page content updated successfully!',
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

  const createPageMutation = useMutation({
    mutationFn: async (data: Omit<PageContent, 'id' | 'updatedAt'>) => {
      return await apiRequest('/api/admin/page-content', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/page-content'] });
      setShowAddDialog(false);
      toast({
        title: 'Success',
        description: 'Page created successfully!',
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

  // SEO mutations
  const updateSeoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<SeoSettings> }) => {
      return await apiRequest(`/api/admin/seo-settings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-settings'] });
      setEditingSeo(null);
      toast({
        title: 'Success',
        description: 'SEO settings updated successfully!',
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

  const createSeoMutation = useMutation({
    mutationFn: async (data: Omit<SeoSettings, 'id' | 'updatedAt'>) => {
      return await apiRequest('/api/admin/seo-settings', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-settings'] });
      setShowSeoDialog(false);
      toast({
        title: 'Success',
        description: 'SEO settings created successfully!',
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

  // Blog mutations
  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<BlogPost> }) => {
      return await apiRequest(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setEditingBlog(null);
      toast({
        title: 'Success',
        description: 'Blog post updated successfully!',
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

  const createBlogMutation = useMutation({
    mutationFn: async (data: Omit<BlogPost, 'id' | 'publishedAt'>) => {
      return await apiRequest('/api/blog', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setShowBlogDialog(false);
      toast({
        title: 'Success',
        description: 'Blog post created successfully!',
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">
            Manage website pages, SEO settings, and blog content
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Pages</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>SEO Settings</span>
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Blog Posts</span>
          </TabsTrigger>
        </TabsList>

        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Website Pages</h2>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Page
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Page</DialogTitle>
                  <DialogDescription>
                    Create a new page for your website
                  </DialogDescription>
                </DialogHeader>
                <PageForm onSubmit={createPageMutation} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {pagesLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              pages?.map((page) => (
                <Card key={page.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{page.title}</span>
                          <Badge variant={page.isPublished ? 'default' : 'secondary'}>
                            {page.isPublished ? 'Published' : 'Draft'}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Page: {page.pageName} • Updated: {new Date(page.updatedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setEditingPage(page)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {page.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </p>
                    {page.metaDescription && (
                      <p className="text-xs text-muted-foreground mt-2">
                        <strong>Meta:</strong> {page.metaDescription}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">SEO Settings</h2>
            <Dialog open={showSeoDialog} onOpenChange={setShowSeoDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add SEO Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add SEO Settings</DialogTitle>
                  <DialogDescription>
                    Configure SEO settings for a page
                  </DialogDescription>
                </DialogHeader>
                <SeoForm onSubmit={createSeoMutation} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {seoLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              seoSettings?.map((seo) => (
                <Card key={seo.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{seo.title}</CardTitle>
                        <CardDescription>
                          Page: {seo.pageName} • Updated: {new Date(seo.updatedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setEditingSeo(seo)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {seo.description && (
                      <p className="text-sm">
                        <strong>Description:</strong> {seo.description}
                      </p>
                    )}
                    {seo.keywords && (
                      <p className="text-sm">
                        <strong>Keywords:</strong> {seo.keywords}
                      </p>
                    )}
                    {seo.ogImage && (
                      <p className="text-sm">
                        <strong>OG Image:</strong> {seo.ogImage}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Blog Posts</h2>
            <Dialog open={showBlogDialog} onOpenChange={setShowBlogDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Blog Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Blog Post</DialogTitle>
                  <DialogDescription>
                    Create a new blog post
                  </DialogDescription>
                </DialogHeader>
                <BlogForm onSubmit={createBlogMutation} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {blogLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              blogPosts?.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center space-x-2">
                          <span>{post.title}</span>
                          <Badge variant="outline">{post.category}</Badge>
                        </CardTitle>
                        <CardDescription>
                          Slug: {post.slug} • Published: {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setEditingBlog(post)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          {post.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Page Dialog */}
      <Dialog open={!!editingPage} onOpenChange={(open) => !open && setEditingPage(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>
              Update page content and settings
            </DialogDescription>
          </DialogHeader>
          <PageForm
            initialData={editingPage || undefined}
            onSubmit={(data) => editingPage && updatePageMutation.mutate({ id: editingPage.id, data })}
          />
        </DialogContent>
      </Dialog>

      {/* Edit SEO Dialog */}
      <Dialog open={!!editingSeo} onOpenChange={(open) => !open && setEditingSeo(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit SEO Settings</DialogTitle>
            <DialogDescription>
              Update SEO configuration
            </DialogDescription>
          </DialogHeader>
          <SeoForm
            initialData={editingSeo || undefined}
            onSubmit={(data) => editingSeo && updateSeoMutation.mutate({ id: editingSeo.id, data })}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={!!editingBlog} onOpenChange={(open) => !open && setEditingBlog(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update blog post content
            </DialogDescription>
          </DialogHeader>
          <BlogForm
            initialData={editingBlog || undefined}
            onSubmit={(data) => editingBlog && updateBlogMutation.mutate({ id: editingBlog.id, data })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Page Form Component
function PageForm({ initialData, onSubmit }: { initialData?: PageContent; onSubmit: { mutate: (data: any) => void; isPending: boolean } }) {
  const [formData, setFormData] = useState({
    pageName: initialData?.pageName || '',
    title: initialData?.title || '',
    content: initialData?.content || '',
    metaDescription: initialData?.metaDescription || '',
    isPublished: initialData?.isPublished ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pageName">Page Name</Label>
          <Input
            id="pageName"
            value={formData.pageName}
            onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
            placeholder="home, about, contact"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Page Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Page title"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          placeholder="Brief description for search engines"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (HTML)</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Page content in HTML format"
          rows={12}
          className="font-mono text-sm"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={onSubmit.isPending}>
          {onSubmit.isPending ? 'Saving...' : 'Save Page'}
        </Button>
      </DialogFooter>
    </form>
  );
}

// SEO Form Component
function SeoForm({ initialData, onSubmit }: { initialData?: SeoSettings; onSubmit: { mutate: (data: any) => void; isPending: boolean } }) {
  const [formData, setFormData] = useState({
    pageName: initialData?.pageName || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    keywords: initialData?.keywords || '',
    ogTitle: initialData?.ogTitle || '',
    ogDescription: initialData?.ogDescription || '',
    ogImage: initialData?.ogImage || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pageName">Page Name</Label>
          <Input
            id="pageName"
            value={formData.pageName}
            onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
            placeholder="home, about, contact"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">SEO Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="SEO optimized title"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Meta Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Meta description for search engines"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords</Label>
        <Input
          id="keywords"
          value={formData.keywords}
          onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ogTitle">Open Graph Title</Label>
        <Input
          id="ogTitle"
          value={formData.ogTitle}
          onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
          placeholder="Title for social media sharing"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ogDescription">Open Graph Description</Label>
        <Textarea
          id="ogDescription"
          value={formData.ogDescription}
          onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
          placeholder="Description for social media sharing"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ogImage">Open Graph Image</Label>
        <Input
          id="ogImage"
          value={formData.ogImage}
          onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={onSubmit.isPending}>
          {onSubmit.isPending ? 'Saving...' : 'Save SEO Settings'}
        </Button>
      </DialogFooter>
    </form>
  );
}

// Blog Form Component
function BlogForm({ initialData, onSubmit }: { initialData?: BlogPost; onSubmit: { mutate: (data: any) => void; isPending: boolean } }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    image: initialData?.image || '',
    category: initialData?.category || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit.mutate(formData);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              setFormData({ 
                ...formData, 
                title,
                slug: formData.slug || generateSlug(title)
              });
            }}
            placeholder="Blog post title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="blog-post-slug"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Installation">Installation</SelectItem>
              <SelectItem value="Remodelling">Remodelling</SelectItem>
              <SelectItem value="3D Design">3D Design</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Inspiration">Inspiration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Featured Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Brief excerpt for the blog post"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Full blog post content"
          rows={12}
          required
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={onSubmit.isPending}>
          {onSubmit.isPending ? 'Saving...' : 'Save Blog Post'}
        </Button>
      </DialogFooter>
    </form>
  );
}