import { useState, useEffect } from "react";
import { Camera, Eye, Upload, Scan, Sparkles, Monitor, Smartphone, RotateCcw, ZoomIn, Move3D, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/language-context";

interface ARPreviewProps {
  productId?: number;
  productName?: string;
  productImage?: string;
}

export default function ARPreview({ productId = 1, productName = "Elegant Marble Stone", productImage }: ARPreviewProps) {
  const { t, language } = useLanguage();
  const [isAROpen, setIsAROpen] = useState(false);
  const [arMode, setArMode] = useState<'camera' | 'room' | 'upload'>('camera');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [arSupported] = useState(() => {
    return typeof navigator !== 'undefined' && 
           ('xr' in navigator || 'webkitGetUserMedia' in navigator || 'getUserMedia' in navigator);
  });
  
  const sampleRooms = [
    { id: 1, name: "Modern Living Room", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop" },
    { id: 2, name: "Luxury Bathroom", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&h=400&fit=crop" },
    { id: 3, name: "Contemporary Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop" }
  ];

  const stoneTexture = productImage || "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=300&h=300&fit=crop";

  const handleARLaunch = () => {
    setIsLoading(true);
    setIsAROpen(true);
    
    // Simulate AR loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setArMode('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
              <Scan className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AR Preview
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Visualize {productName} in your space using augmented reality
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* AR Status Badge */}
          <div className="flex items-center justify-center">
            <Badge variant={arSupported ? "default" : "secondary"} className="text-xs px-3 py-1">
              {arSupported ? (
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

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleARLaunch}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              Launch AR Experience
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  setArMode('room');
                  setIsAROpen(true);
                }}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4 mr-1" />
                Virtual Room
              </Button>
              
              <Button
                onClick={() => document.getElementById('space-upload')?.click()}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload Space
              </Button>
            </div>
          </div>

          <input
            id="space-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </CardContent>
      </Card>

      {/* AR Experience Dialog */}
      <Dialog open={isAROpen} onOpenChange={setIsAROpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black/95 border-none">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-white text-xl font-bold">AR Preview: {productName}</DialogTitle>
                <DialogDescription className="text-gray-300">
                  {arMode === 'camera' && "Camera view with AR overlay"}
                  {arMode === 'room' && "Virtual room visualization"}
                  {arMode === 'upload' && "Your uploaded space"}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAROpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 p-6 pt-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-white text-lg">Initializing AR Experience...</p>
                  <p className="text-gray-400">Loading camera and stone texture</p>
                </div>
              </div>
            ) : (
              <div className="h-full relative rounded-lg overflow-hidden">
                {/* Mode Selection */}
                <div className="absolute top-4 left-4 z-10 flex space-x-2">
                  <Button
                    size="sm"
                    variant={arMode === 'camera' ? 'default' : 'secondary'}
                    onClick={() => setArMode('camera')}
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Camera
                  </Button>
                  <Button
                    size="sm"
                    variant={arMode === 'room' ? 'default' : 'secondary'}
                    onClick={() => setArMode('room')}
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Room
                  </Button>
                </div>

                {/* AR Controls */}
                <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    <Move3D className="h-4 w-4" />
                  </Button>
                </div>

                {/* Main AR View */}
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-lg relative overflow-hidden">
                  {arMode === 'camera' && (
                    <div className="relative w-full h-full">
                      {/* Simulated camera view */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative">
                            <div className="w-48 h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg shadow-2xl mx-auto mb-4 relative overflow-hidden">
                              <img 
                                src={stoneTexture} 
                                alt="Stone texture"
                                className="w-full h-full object-cover opacity-90"
                              />
                              <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                              Live AR
                            </div>
                          </div>
                          <p className="text-white text-sm">Stone preview in your camera view</p>
                          <p className="text-gray-400 text-xs mt-1">Drag to position • Pinch to scale</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {arMode === 'room' && (
                    <div className="w-full h-full">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 h-full">
                        {sampleRooms.map((room, index) => (
                          <div
                            key={room.id}
                            className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                              selectedRoom === index ? 'ring-4 ring-blue-500 scale-105' : 'hover:scale-102'
                            }`}
                            onClick={() => setSelectedRoom(index)}
                          >
                            <img 
                              src={room.image} 
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <h3 className="text-white font-semibold">{room.name}</h3>
                              <p className="text-gray-300 text-sm">Click to preview stone</p>
                            </div>
                            {selectedRoom === index && (
                              <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
                                <Sparkles className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {arMode === 'upload' && uploadedImage && (
                    <div className="relative w-full h-full">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded space"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
                          <div className="w-32 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mx-auto mb-4 relative overflow-hidden">
                            <img 
                              src={stoneTexture} 
                              alt="Stone preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-gray-800 font-semibold">Stone Preview</p>
                          <p className="text-gray-600 text-sm">Positioned in your space</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="font-semibold">{productName}</p>
                      <p className="text-sm text-gray-300">Product ID: {productId}</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => {
                        alert(`${productName} looks perfect! Redirecting to purchase...`);
                        setIsAROpen(false);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}