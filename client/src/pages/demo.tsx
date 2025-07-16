import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  MessageCircle, 
  Calendar, 
  Scan, 
  User, 
  Smartphone, 
  Settings,
  Sparkles,
  Star,
  Eye
} from "lucide-react";

// Import all our new components
import PriceCalculator from "@/components/price-calculator";
import LiveChat from "@/components/live-chat";
import AppointmentBooking from "@/components/appointment-booking";
import ARPreview from "@/components/ar-preview";
import CustomerPortal from "@/components/customer-portal";
import ProgressiveWebApp from "@/components/progressive-web-app";
import EnhancedUI from "@/components/enhanced-ui";

export default function DemoPage() {
  const [location] = useLocation();
  const [activeDemo, setActiveDemo] = useState("price-calculator");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1] || '');
    const feature = searchParams.get('feature');
    if (feature) {
      setActiveDemo(feature);
    }
  }, [location]);

  const features = [
    {
      id: "price-calculator",
      name: "Price Calculator",
      icon: Calculator,
      description: "Interactive stone pricing with area, thickness, and installation options",
      component: <PriceCalculator productName="Carrara Marble" basePrice={85} />,
      color: "bg-blue-500"
    },
    {
      id: "live-chat",
      name: "Live Chat Support",
      icon: MessageCircle,
      description: "Real-time customer support with automated responses",
      component: <LiveChat />,
      color: "bg-green-500"
    },
    {
      id: "appointment-booking",
      name: "Appointment Booking",
      icon: Calendar,
      description: "Schedule consultations with our stone experts",
      component: <AppointmentBooking />,
      color: "bg-purple-500"
    },
    {
      id: "ar-preview",
      name: "AR Preview",
      icon: Scan,
      description: "Visualize stones in your space using augmented reality",
      component: <ARPreview productName="Travertine Tiles" productId={1} />,
      color: "bg-orange-500"
    },
    {
      id: "customer-portal",
      name: "Customer Portal",
      icon: User,
      description: "Comprehensive dashboard for project management",
      component: <CustomerPortal userId={1} />,
      color: "bg-indigo-500"
    },
    {
      id: "progressive-web-app",
      name: "Progressive Web App",
      icon: Smartphone,
      description: "Mobile app experience with offline capabilities",
      component: <ProgressiveWebApp />,
      color: "bg-pink-500"
    },
    {
      id: "enhanced-ui",
      name: "Enhanced UI Settings",
      icon: Settings,
      description: "Accessibility and customization options",
      component: <EnhancedUI />,
      color: "bg-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-cream via-white to-stone-gold/10 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="h-8 w-8 text-stone-bronze" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-stone-bronze to-stone-gold bg-clip-text text-transparent">
              Elegance Stone Demo
            </h1>
            <Sparkles className="h-8 w-8 text-stone-bronze" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our comprehensive suite of features designed to transform your stone selection and installation process
          </p>
        </div>

        {/* Feature Overview */}
        <Card className="mb-8 glass-morph animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-6 w-6 text-stone-bronze" />
              <span>Feature Showcase</span>
            </CardTitle>
            <CardDescription>
              Click on any feature below to see it in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card 
                    key={feature.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 magnetic ${
                      activeDemo === feature.id ? 'ring-2 ring-stone-bronze shadow-lg' : 'hover:shadow-md'
                    }`}
                    onClick={() => setActiveDemo(feature.id)}
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{feature.name}</h3>
                      <p className="text-xs text-gray-600 leading-tight">{feature.description}</p>
                      {activeDemo === feature.id && (
                        <Badge className="mt-2 bg-stone-bronze text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Feature Demo Area */}
        <Card className="glass-morph animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  {(() => {
                    const feature = features.find(f => f.id === activeDemo);
                    const IconComponent = feature?.icon || Calculator;
                    return <IconComponent className="h-6 w-6 text-stone-bronze" />;
                  })()}
                  <span>{features.find(f => f.id === activeDemo)?.name || "Feature Demo"}</span>
                </CardTitle>
                <CardDescription>
                  {features.find(f => f.id === activeDemo)?.description}
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-stone-bronze text-stone-bronze">
                Interactive Demo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="min-h-[500px] flex items-center justify-center">
            <div className="w-full max-w-4xl">
              {features.find(f => f.id === activeDemo)?.component}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Status */}
        <Card className="mt-8 glass-morph animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle>Implementation Status</CardTitle>
            <CardDescription>Current status of all features and components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-green-600">✅ Completed Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Interactive Price Calculator</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Live Chat Support Widget</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Appointment Booking System</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>AR Preview Component</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Customer Portal Dashboard</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Progressive Web App Features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Enhanced UI & Accessibility</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Database Schema & Storage</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-blue-600">🔧 Technical Implementation</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>PostgreSQL Database Integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Enhanced API Endpoints</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Advanced CSS Animations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>TypeScript Type Safety</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Responsive Design System</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Multi-language Support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Glass Morphism UI Effects</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Stone-themed Visual Design</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">All Requested Features Implemented!</span>
              </div>
              <p className="text-sm text-green-700">
                The Elegance Stone platform now includes all the advanced features for a comprehensive 
                stone supplier experience, including price calculation, appointment booking, AR preview, 
                customer portal, progressive web app capabilities, and enhanced UI customization.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}