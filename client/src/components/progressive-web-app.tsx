import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Smartphone, Wifi, Bell, Share, Star } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface PWAInstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function ProgressiveWebApp() {
  const { t, language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone;
    setIsInstalled(isStandalone || isInWebAppiOS);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as PWAInstallPrompt);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    
    if (result.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Elegance Stone',
          text: 'Discover premium natural stone solutions',
          url: window.location.origin,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard!');
    }
  };

  if (isInstalled) {
    return (
      <Card className="w-full max-w-md mx-auto glass-morph">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Smartphone className="h-6 w-6 text-green-500" />
            <CardTitle className="text-xl font-bold text-green-600">
              App Installed!
            </CardTitle>
          </div>
          <CardDescription>
            You're now using the Elegance Stone app
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <Wifi className="h-3 w-3 mr-1" />
              Offline Ready
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Bell className="h-3 w-3 mr-1" />
              Push Notifications
            </Badge>
          </div>
          <Button onClick={shareApp} variant="outline" className="w-full">
            <Share className="h-4 w-4 mr-2" />
            Share App
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto glass-morph">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Download className="h-6 w-6 text-stone-bronze" />
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-stone-bronze to-stone-gold bg-clip-text text-transparent">
            Install Our App
          </CardTitle>
        </div>
        <CardDescription>
          Get the best experience with our mobile app
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* App Features */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Wifi className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">Works Offline</div>
              <div className="text-sm text-gray-500">Browse products without internet</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Bell className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-gray-500">Get updates on your projects</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Smartphone className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <div className="font-medium">Native Experience</div>
              <div className="text-sm text-gray-500">App-like performance on your device</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <div className="font-medium">Quick Access</div>
              <div className="text-sm text-gray-500">Add to home screen for instant access</div>
            </div>
          </div>
        </div>

        {/* Install Instructions */}
        {isIOS ? (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-medium mb-2">Install on iOS:</div>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Tap the share button in Safari</li>
              <li>2. Scroll down and tap "Add to Home Screen"</li>
              <li>3. Tap "Add" to install the app</li>
            </ol>
          </div>
        ) : isInstallable ? (
          <Button 
            onClick={handleInstallClick}
            className="w-full bg-gradient-stone hover:opacity-90 text-white font-semibold py-3 magnetic"
          >
            <Download className="h-4 w-4 mr-2" />
            Install App
          </Button>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600">
              Install option will appear when available on your device
            </div>
          </div>
        )}

        {/* App Info */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="font-bold text-stone-bronze">5MB</div>
            <div className="text-gray-500">App Size</div>
          </div>
          <div>
            <div className="font-bold text-stone-bronze">4.8★</div>
            <div className="text-gray-500">Rating</div>
          </div>
          <div>
            <div className="font-bold text-stone-bronze">Free</div>
            <div className="text-gray-500">Download</div>
          </div>
        </div>

        <Button onClick={shareApp} variant="outline" className="w-full">
          <Share className="h-4 w-4 mr-2" />
          Share with Friends
        </Button>
      </CardContent>
    </Card>
  );
}