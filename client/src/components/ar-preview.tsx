import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scan, Camera, Phone, Monitor, Upload, Eye, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface ARPreviewProps {
  productId?: number;
  productName?: string;
  productImage?: string;
}

export default function ARPreview({ productId, productName, productImage }: ARPreviewProps) {
  const { t, language } = useLanguage();
  const [isARSupported] = useState(() => {
    // Check if device supports AR/WebXR
    return typeof navigator !== 'undefined' && 
           ('xr' in navigator || 'webkitGetUserMedia' in navigator || 'getUserMedia' in navigator);
  });

  const handleARLaunch = () => {
    if (!isARSupported) {
      // Fallback for non-AR devices
      window.open(`https://model-viewer.dev/examples/augmented-reality.html`, '_blank');
      return;
    }

    // In a real implementation, this would launch WebXR or ARCore/ARKit
    alert('AR feature would launch here with WebXR integration');
  };

  const handleVirtualRoom = () => {
    // This would open a virtual room configurator
    window.open(`/virtual-room?product=${productId}`, '_blank');
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-morph">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Scan className="h-6 w-6 text-stone-bronze" />
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-stone-bronze to-stone-gold bg-clip-text text-transparent">
            AR Preview
          </CardTitle>
        </div>
        <CardDescription>
          See how {productName || "this stone"} looks in your space
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AR Feature Status */}
        <div className="flex items-center justify-center space-x-2">
          <Badge variant={isARSupported ? "default" : "secondary"} className="text-xs">
            {isARSupported ? (
              <>
                <Sparkles className="h-3 w-3 mr-1" />
                AR Ready
              </>
            ) : (
              <>
                <Monitor className="h-3 w-3 mr-1" />
                3D Preview Available
              </>
            )}
          </Badge>
        </div>

        {/* Preview Options */}
        <div className="space-y-3">
          {/* AR Camera View */}
          <Button
            onClick={handleARLaunch}
            className="w-full bg-gradient-stone hover:opacity-90 text-white font-semibold py-3 magnetic flex items-center space-x-2"
          >
            <Camera className="h-4 w-4" />
            <span>View in Your Space</span>
          </Button>

          {/* Virtual Room */}
          <Button
            onClick={handleVirtualRoom}
            variant="outline"
            className="w-full border-stone-bronze text-stone-bronze hover:bg-stone-bronze/10 fluid-hover flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Virtual Room Tour</span>
          </Button>

          {/* Upload Space Photo */}
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 fluid-hover flex items-center space-x-2"
            onClick={() => document.getElementById('space-upload')?.click()}
          >
            <Upload className="h-4 w-4" />
            <span>Upload Your Space</span>
          </Button>
          <input
            id="space-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                // Handle space photo upload for AR overlay
                alert('Photo uploaded! AR overlay feature would process this image.');
              }
            }}
          />
        </div>

        {/* How to Use */}
        <div className="mt-6 p-4 bg-gradient-to-br from-stone-cream/10 to-stone-gold/10 rounded-lg border border-stone-bronze/20">
          <h4 className="font-semibold text-sm mb-2 flex items-center space-x-1">
            <Phone className="h-4 w-4" />
            <span>How to Use AR</span>
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Point your camera at the installation area</li>
            <li>• Tap to place the stone pattern</li>
            <li>• Move around to see different angles</li>
            <li>• Take screenshots to share with others</li>
          </ul>
        </div>

        {/* Feature Benefits */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-stone-bronze">1:1</div>
            <div className="text-xs text-gray-600">Scale Accuracy</div>
          </div>
          <div className="p-2 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-stone-bronze">360°</div>
            <div className="text-xs text-gray-600">View Angles</div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          * AR features work best in good lighting conditions
        </div>
      </CardContent>
    </Card>
  );
}