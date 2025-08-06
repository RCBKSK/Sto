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
import { Plus, Edit, Trash2, Save, FileText, Globe, Settings, Image, Layout, Type, Camera } from 'lucide-react';

interface PageContent {
  id: number;
  pageName: string;
  sectionKey: string;
  sectionType: string;
  title?: string;
  content: any;
  mediaUrl?: string;
  language: string;
  isPublished: boolean;
  sortOrder: number;
  updatedAt: string;
}

interface WebsiteSetting {
  id: number;
  settingKey: string;
  settingValue: any;
  description: string;
  updatedAt: string;
}

interface SeoSetting {
  id: number;
  pageName: string;
  title: string;
  description: string | null;
  keywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  language: string;
  updatedAt: string;
}

interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  url: string;
  fileType: string;
  fileSize: number;
  alt: string;
  description: string;
  uploadedAt: string;
}

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('page-content');
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [editingSetting, setEditingSetting] = useState<WebsiteSetting | null>(null);
  const [editingSeo, setEditingSeo] = useState<SeoSetting | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaFile | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addDialogType, setAddDialogType] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Available pages and content types
  const availablePages = ['home', 'about', 'products', 'services', 'gallery', 'blog', 'contact'];
  const contentTypes = ['text', 'html', 'image', 'json'];
  const languages = ['en', 'fa'];

  // Fetch page contents
  const { data: pageContents = [], isLoading: pageContentsLoading } = useQuery<PageContent[]>({
    queryKey: ['/api/admin/page-content', selectedPage, selectedLanguage],
    queryFn: async () => {
      const response = await fetch(`/api/admin/page-content?page=${selectedPage}&language=${selectedLanguage}`);
      if (!response.ok) throw new Error('Failed to fetch page contents');
      return await response.json();
    },
  });

  // Fetch website settings
  const { data: websiteSettings = [], isLoading: settingsLoading } = useQuery<WebsiteSetting[]>({
    queryKey: ['/api/admin/website-settings'],
    queryFn: async () => {
      const response = await fetch('/api/admin/website-settings');
      if (!response.ok) throw new Error('Failed to fetch website settings');
      return await response.json();
    },
  });

  // Fetch SEO settings
  const { data: seoSettings = [], isLoading: seoLoading } = useQuery<SeoSetting[]>({
    queryKey: ['/api/admin/seo-settings', selectedLanguage],
    queryFn: async () => {
      const response = await fetch(`/api/admin/seo-settings?language=${selectedLanguage}`);
      if (!response.ok) throw new Error('Failed to fetch SEO settings');
      return await response.json();
    },
  });

  // Fetch media files
  const { data: mediaFiles = [], isLoading: mediaLoading } = useQuery<MediaFile[]>({
    queryKey: ['/api/admin/media'],
    queryFn: async () => {
      const response = await fetch('/api/admin/media');
      if (!response.ok) throw new Error('Failed to fetch media files');
      return await response.json();
    },
  });

  // Page content mutations
  const updatePageContentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<PageContent> }) => {
      return await apiRequest(`/api/admin/page-content/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/page-content'] });
      setEditingContent(null);
      toast({ title: 'Success', description: 'Content updated successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const createPageContentMutation = useMutation({
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
      toast({ title: 'Success', description: 'Content created successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deletePageContentMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/page-content/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/page-content'] });
      toast({ title: 'Success', description: 'Content deleted successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Website settings mutations
  const updateWebsiteSettingMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<WebsiteSetting> }) => {
      return await apiRequest(`/api/admin/website-settings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/website-settings'] });
      setEditingSetting(null);
      toast({ title: 'Success', description: 'Setting updated successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const createWebsiteSettingMutation = useMutation({
    mutationFn: async (data: Omit<WebsiteSetting, 'id' | 'updatedAt'>) => {
      return await apiRequest('/api/admin/website-settings', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/website-settings'] });
      setShowAddDialog(false);
      toast({ title: 'Success', description: 'Setting created successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // SEO mutations
  const updateSeoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<SeoSetting> }) => {
      return await apiRequest(`/api/admin/seo-settings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-settings'] });
      setEditingSeo(null);
      toast({ title: 'Success', description: 'SEO settings updated successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const createSeoMutation = useMutation({
    mutationFn: async (data: Omit<SeoSetting, 'id' | 'updatedAt'>) => {
      return await apiRequest('/api/admin/seo-settings', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-settings'] });
      setShowAddDialog(false);
      toast({ title: 'Success', description: 'SEO settings created successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Media mutations
  const updateMediaMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<MediaFile> }) => {
      return await apiRequest(`/api/admin/media/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/media'] });
      setEditingMedia(null);
      toast({ title: 'Success', description: 'Media updated successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const createMediaMutation = useMutation({
    mutationFn: async (data: Omit<MediaFile, 'id' | 'uploadedAt'>) => {
      return await apiRequest('/api/admin/media', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/media'] });
      setShowAddDialog(false);
      toast({ title: 'Success', description: 'Media uploaded successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMediaMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/media/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/media'] });
      toast({ title: 'Success', description: 'Media deleted successfully!' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const openAddDialog = (type: string) => {
    setAddDialogType(type);
    setShowAddDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Complete Website CMS</h1>
          <p className="text-muted-foreground">
            Edit every piece of content on your website - text, images, settings, and SEO
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fa">فارسی</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="page-content" className="flex items-center space-x-2">
            <Layout className="w-4 h-4" />
            <span>Page Content</span>
          </TabsTrigger>
          <TabsTrigger value="website-settings" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Website Settings</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>SEO Settings</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center space-x-2">
            <Camera className="w-4 h-4" />
            <span>Media Library</span>
          </TabsTrigger>
        </TabsList>

        {/* Page Content Tab */}
        <TabsContent value="page-content" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div>
                <Label htmlFor="page-select">Page</Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePages.map(page => (
                      <SelectItem key={page} value={page}>{page.charAt(0).toUpperCase() + page.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => openAddDialog('page-content')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Content Section
            </Button>
          </div>

          <div className="grid gap-6">
            {pageContentsLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              pageContents.map((content: PageContent) => (
                <Card key={content.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Type className="w-4 h-4" />
                          <span>{content.sectionKey}</span>
                          <Badge variant={content.isPublished ? 'default' : 'secondary'}>
                            {content.isPublished ? 'Published' : 'Draft'}
                          </Badge>
                          <Badge variant="outline">{content.sectionType}</Badge>
                        </CardTitle>
                        <CardDescription>
                          Page: {content.pageName} • Updated: {new Date(content.updatedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setEditingContent(content)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deletePageContentMutation.mutate(content.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Content Preview:</p>
                      {content.contentType === 'text' && (
                        <p className="text-sm text-muted-foreground">
                          {typeof content.content === 'string' ? content.content.substring(0, 200) + '...' : JSON.stringify(content.content).substring(0, 200) + '...'}
                        </p>
                      )}
                      {content.contentType === 'html' && (
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{
                          __html: typeof content.content === 'string' ? content.content.substring(0, 200) + '...' : JSON.stringify(content.content).substring(0, 200) + '...'
                        }} />
                      )}
                      {content.contentType === 'image' && (
                        <img
                          src={typeof content.content === 'object' && content.content.url ? content.content.url : content.content}
                          alt="Content preview"
                          className="w-32 h-24 object-cover rounded"
                        />
                      )}
                      {content.contentType === 'json' && (
                        <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-32">
                          {JSON.stringify(content.content, null, 2)}
                        </pre>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Website Settings Tab */}
        <TabsContent value="website-settings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Website Settings</h2>
            <Button onClick={() => openAddDialog('website-setting')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Setting
            </Button>
          </div>

          <div className="grid gap-6">
            {settingsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              websiteSettings?.map((setting) => (
                <Card key={setting.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>{setting.settingKey}</span>
                        </CardTitle>
                        <CardDescription>{setting.description}</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setEditingSetting(setting)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm bg-gray-50 p-3 rounded overflow-auto">
                      {JSON.stringify(setting.settingValue, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* SEO Settings Tab */}
        <TabsContent value="seo" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">SEO Settings</h2>
            <Button onClick={() => openAddDialog('seo')}>
              <Plus className="w-4 h-4 mr-2" />
              Add SEO Settings
            </Button>
          </div>

          <div className="grid gap-6">
            {seoLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              seoSettings.map((seo: SeoSetting) => (
                <Card key={seo.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>{seo.title}</span>
                        </CardTitle>
                        <CardDescription>
                          Page: {seo.pageName} • Language: {seo.language} • Updated: {new Date(seo.updatedAt).toLocaleDateString()}
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
                      <div className="flex items-center space-x-2">
                        <strong className="text-sm">OG Image:</strong>
                        <img src={seo.ogImage} alt="OG Preview" className="w-16 h-12 object-cover rounded" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Media Library Tab */}
        <TabsContent value="media" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Media Library</h2>
            <Button onClick={() => openAddDialog('media')}>
              <Plus className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaLoading ? (
              <div className="col-span-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-48 bg-gray-100 animate-pulse rounded" />
                  ))}
                </div>
              </div>
            ) : (
              mediaFiles?.map((media) => (
                <Card key={media.id}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                        {media.fileType.startsWith('image/') ? (
                          <img
                            src={media.url}
                            alt={media.alt || media.originalName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium truncate">{media.originalName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {media.fileType} • {Math.round(media.fileSize / 1024)}KB
                        </p>
                        {media.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {media.description}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingMedia(media)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMediaMutation.mutate(media.id)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Content Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New {addDialogType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</DialogTitle>
          </DialogHeader>
          {addDialogType === 'page-content' && (
            <PageContentForm onSubmit={createPageContentMutation} />
          )}
          {addDialogType === 'website-setting' && (
            <WebsiteSettingForm onSubmit={createWebsiteSettingMutation} />
          )}
          {addDialogType === 'seo' && (
            <SeoForm onSubmit={createSeoMutation} />
          )}
          {addDialogType === 'media' && (
            <MediaForm onSubmit={createMediaMutation} />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialogs */}
      <Dialog open={!!editingContent} onOpenChange={(open) => !open && setEditingContent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Page Content</DialogTitle>
          </DialogHeader>
          <PageContentForm
            initialData={editingContent || undefined}
            onSubmit={(data) => editingContent && updatePageContentMutation.mutate({ id: editingContent.id, data })}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingSetting} onOpenChange={(open) => !open && setEditingSetting(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Website Setting</DialogTitle>
          </DialogHeader>
          <WebsiteSettingForm
            initialData={editingSetting || undefined}
            onSubmit={(data) => editingSetting && updateWebsiteSettingMutation.mutate({ id: editingSetting.id, data })}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingSeo} onOpenChange={(open) => !open && setEditingSeo(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit SEO Settings</DialogTitle>
          </DialogHeader>
          <SeoForm
            initialData={editingSeo || undefined}
            onSubmit={(data) => editingSeo && updateSeoMutation.mutate({ id: editingSeo.id, data })}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingMedia} onOpenChange={(open) => !open && setEditingMedia(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Media File</DialogTitle>
          </DialogHeader>
          <MediaForm
            initialData={editingMedia || undefined}
            onSubmit={(data) => editingMedia && updateMediaMutation.mutate({ id: editingMedia.id, data })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Page Content Form Component
function PageContentForm({ initialData, onSubmit }: { initialData?: PageContent; onSubmit: any }) {
  const availablePages = ['home', 'about', 'products', 'services', 'gallery', 'blog', 'contact'];
  const contentTypes = ['text', 'html', 'image', 'json'];
  const languages = ['en', 'fa'];

  const [formData, setFormData] = useState({
    pageName: initialData?.pageName || 'home',
    sectionKey: initialData?.sectionKey || '',
    sectionType: initialData?.sectionType || 'text',
    title: initialData?.title || '',
    content: initialData?.content || '',
    mediaUrl: initialData?.mediaUrl || '',
    isPublished: initialData?.isPublished ?? true,
    language: initialData?.language || 'en',
    sortOrder: initialData?.sortOrder || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let processedContent = formData.content;
    if (formData.sectionType === 'json' && typeof formData.content === 'string') {
      try {
        processedContent = JSON.parse(formData.content);
      } catch (e) {
        // Keep as string if invalid JSON
      }
    }

    onSubmit.mutate({ ...formData, content: processedContent });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pageName">Page</Label>
          <Select value={formData.pageName} onValueChange={(value) => setFormData({ ...formData, pageName: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availablePages.map(page => (
                <SelectItem key={page} value={page}>{page.charAt(0).toUpperCase() + page.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sectionKey">Section Key</Label>
          <Input
            id="sectionKey"
            value={formData.sectionKey}
            onChange={(e) => setFormData({ ...formData, sectionKey: e.target.value })}
            placeholder="hero, about, features, etc."
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sectionType">Content Type</Label>
          <Select value={formData.sectionType} onValueChange={(value) => setFormData({ ...formData, sectionType: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {contentTypes.map(type => (
                <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fa">فارسی</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={typeof formData.content === 'object' ? JSON.stringify(formData.content, null, 2) : formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder={`Enter ${formData.sectionType} content...`}
          rows={formData.sectionType === 'json' ? 10 : 6}
          className={formData.sectionType === 'json' ? 'font-mono text-sm' : ''}
          required
        />
        {formData.sectionType === 'json' && (
          <p className="text-xs text-muted-foreground">
            Enter valid JSON. For images: {`{"url": "...", "alt": "...", "caption": "..."}`}
          </p>
        )}
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
          {onSubmit.isPending ? 'Saving...' : 'Save Content'}
        </Button>
      </DialogFooter>
    </form>
  );
}

// Website Setting Form Component
function WebsiteSettingForm({ initialData, onSubmit }: { initialData?: WebsiteSetting; onSubmit: any }) {
  const [formData, setFormData] = useState({
    settingKey: initialData?.settingKey || '',
    settingValue: initialData?.settingValue ? JSON.stringify(initialData.settingValue, null, 2) : '',
    description: initialData?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let processedValue;
    try {
      processedValue = JSON.parse(formData.settingValue);
    } catch (e) {
      processedValue = formData.settingValue;
    }

    onSubmit.mutate({
      settingKey: formData.settingKey,
      settingValue: processedValue,
      description: formData.description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="settingKey">Setting Key</Label>
        <Input
          id="settingKey"
          value={formData.settingKey}
          onChange={(e) => setFormData({ ...formData, settingKey: e.target.value })}
          placeholder="site_name, contact_info, social_links, etc."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of this setting"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="settingValue">Setting Value (JSON)</Label>
        <Textarea
          id="settingValue"
          value={formData.settingValue}
          onChange={(e) => setFormData({ ...formData, settingValue: e.target.value })}
          placeholder='{"key": "value"} or "simple value"'
          rows={8}
          className="font-mono text-sm"
          required
        />
        <p className="text-xs text-muted-foreground">
          Enter JSON for complex values or simple text for strings
        </p>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={onSubmit.isPending}>
          {onSubmit.isPending ? 'Saving...' : 'Save Setting'}
        </Button>
      </DialogFooter>
    </form>
  );
}

// SEO Form Component (same as before but with language support)
function SeoForm({ initialData, onSubmit }: { initialData?: SeoSetting; onSubmit: any }) {
  const availablePages = ['home', 'about', 'products', 'services', 'gallery', 'blog', 'contact'];

  const [formData, setFormData] = useState({
    pageName: initialData?.pageName || 'home',
    title: initialData?.title || '',
    description: initialData?.description || '',
    keywords: initialData?.keywords || '',
    ogTitle: initialData?.ogTitle || '',
    ogDescription: initialData?.ogDescription || '',
    ogImage: initialData?.ogImage || '',
    language: initialData?.language || 'en',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pageName">Page</Label>
          <Select value={formData.pageName} onValueChange={(value) => setFormData({ ...formData, pageName: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availablePages.map(page => (
                <SelectItem key={page} value={page}>{page.charAt(0).toUpperCase() + page.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fa">فارسی</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

// Media Form Component
function MediaForm({ initialData, onSubmit }: { initialData?: MediaFile; onSubmit: any }) {
  const [formData, setFormData] = useState({
    filename: initialData?.filename || '',
    originalName: initialData?.originalName || '',
    url: initialData?.url || '',
    fileType: initialData?.fileType || '',
    fileSize: initialData?.fileSize || 0,
    alt: initialData?.alt || '',
    description: initialData?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="filename">Filename</Label>
          <Input
            id="filename"
            value={formData.filename}
            onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
            placeholder="image-name.jpg"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="originalName">Original Name</Label>
          <Input
            id="originalName"
            value={formData.originalName}
            onChange={(e) => setFormData({ ...formData, originalName: e.target.value })}
            placeholder="Original filename"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fileType">File Type</Label>
          <Input
            id="fileType"
            value={formData.fileType}
            onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
            placeholder="image/jpeg, image/png, etc."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fileSize">File Size (bytes)</Label>
          <Input
            id="fileSize"
            type="number"
            value={formData.fileSize}
            onChange={(e) => setFormData({ ...formData, fileSize: parseInt(e.target.value) || 0 })}
            placeholder="1024"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alt">Alt Text</Label>
        <Input
          id="alt"
          value={formData.alt}
          onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
          placeholder="Alternative text for accessibility"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description of the media file"
          rows={3}
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={onSubmit.isPending}>
          {onSubmit.isPending ? 'Saving...' : 'Save Media'}
        </Button>
      </DialogFooter>
    </form>
  );
}