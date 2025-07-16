import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Heart, 
  Calendar, 
  FileText, 
  Star, 
  Download, 
  Settings,
  Package,
  Clock,
  CheckCircle,
  Camera
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface CustomerPortalProps {
  userId?: number;
}

export default function CustomerPortal({ userId = 1 }: CustomerPortalProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in a real app this would be fetched based on user session
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "",
    memberSince: "January 2024",
    totalProjects: 3,
    favoriteProducts: 8,
  };

  const { data: wishlist = [] } = useQuery({
    queryKey: ["/api/wishlist", userId],
    queryFn: () => apiRequest(`/api/wishlist/${userId}`),
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ["/api/appointments"],
    queryFn: () => apiRequest("/api/appointments"),
  });

  const { data: projectGallery = [] } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: () => apiRequest("/api/projects"),
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="glass-morph">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="bg-stone-bronze text-white text-lg">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-stone-bronze to-stone-gold bg-clip-text text-transparent">
                Welcome back, {userData.name}!
              </CardTitle>
              <CardDescription className="text-base">
                Member since {userData.memberSince}
              </CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-morph">
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 text-stone-bronze mx-auto mb-2" />
            <div className="text-2xl font-bold">{userData.totalProjects}</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </CardContent>
        </Card>
        <Card className="glass-morph">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userData.favoriteProducts}</div>
            <div className="text-sm text-gray-600">Favorite Products</div>
          </CardContent>
        </Card>
        <Card className="glass-morph">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{appointments.length}</div>
            <div className="text-sm text-gray-600">Upcoming Appointments</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recent Activity */}
            <Card className="glass-morph">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Appointment confirmed for Kitchen Renovation</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Added Carrara Marble to wishlist</div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Quote request submitted</div>
                      <div className="text-xs text-gray-500">3 days ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-morph">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-stone hover:opacity-90 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book New Consultation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Quote
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Project Photos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Card className="glass-morph">
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
              <CardDescription>Track the progress of your stone installations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock project data */}
                <div className="border border-stone-bronze/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Kitchen Renovation - Carrara Marble</h3>
                    <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Started: Jan 15, 2024 • Expected completion: Feb 20, 2024
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-stone-bronze h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500">60% Complete</div>
                </div>

                <div className="border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Bathroom Floor - Travertine</h3>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Completed: Dec 10, 2023
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Star className="h-3 w-3 mr-1" />
                      Leave Review
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download Photos
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          <Card className="glass-morph">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Your Wishlist</span>
              </CardTitle>
              <CardDescription>Products you're interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Mock wishlist items */}
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img 
                    src="https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400" 
                    alt="Carrara Marble"
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold mb-1">Carrara Marble</h3>
                  <p className="text-stone-bronze font-bold">$85/sq ft</p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" className="flex-1">Add to Cart</Button>
                    <Button size="sm" variant="outline">
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img 
                    src="https://images.unsplash.com/photo-1564540574859-0dfb63985ea5?w=400" 
                    alt="Travertine"
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold mb-1">Travertine Tiles</h3>
                  <p className="text-stone-bronze font-bold">$45/sq ft</p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" className="flex-1">Add to Cart</Button>
                    <Button size="sm" variant="outline">
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <Card className="glass-morph">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Your Appointments</span>
              </CardTitle>
              <CardDescription>Scheduled consultations and meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock appointments */}
                <div className="border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Kitchen Design Consultation</h3>
                    <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>📅 Tomorrow, Jan 18, 2024 at 2:00 PM</div>
                    <div>👤 With John Smith, Design Specialist</div>
                    <div>📍 Showroom Visit</div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm">Join Meeting</Button>
                    <Button size="sm" variant="outline">Reschedule</Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 opacity-60">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Initial Consultation</h3>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>📅 Jan 10, 2024 at 10:00 AM</div>
                    <div>👤 With Sarah Wilson, Project Manager</div>
                    <div>✅ Project scope defined</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card className="glass-morph">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Documents & Files</span>
              </CardTitle>
              <CardDescription>Quotes, contracts, and project documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Mock documents */}
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Kitchen Renovation Quote.pdf</div>
                      <div className="text-sm text-gray-500">Generated Jan 15, 2024</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Installation Contract.pdf</div>
                      <div className="text-sm text-gray-500">Signed Jan 12, 2024</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Camera className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Project Photos.zip</div>
                      <div className="text-sm text-gray-500">Updated Jan 16, 2024</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}