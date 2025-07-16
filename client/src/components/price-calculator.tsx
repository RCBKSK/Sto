import { useState, useEffect } from "react";
import { Calculator, Ruler, Palette, Wrench, DollarSign, CheckCircle, Info, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/language-context";

interface PriceCalculatorProps {
  productId?: number;
  productName?: string;
  basePrice?: number;
}

interface CalculationResult {
  materialCost: number;
  laborCost: number;
  finishCost: number;
  installationCost: number;
  subtotal: number;
  tax: number;
  total: number;
  area: number;
}

export default function PriceCalculator({ 
  productId = 1, 
  productName = "Premium Natural Stone", 
  basePrice = 85 
}: PriceCalculatorProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form data
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    thickness: '20mm'
  });
  
  const [options, setOptions] = useState({
    finish: 'polished',
    edge: 'straight',
    installation: true,
    delivery: true
  });
  
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);

  // Pricing data
  const finishPrices = {
    polished: { name: "Polished", price: 0, description: "Smooth, reflective surface" },
    honed: { name: "Honed", price: 10, description: "Matte, smooth finish" },
    brushed: { name: "Brushed", price: 15, description: "Textured, anti-slip surface" },
    flamed: { name: "Flamed", price: 20, description: "Rough, natural texture" }
  };

  const edgePrices = {
    straight: { name: "Straight Edge", price: 0 },
    beveled: { name: "Beveled Edge", price: 8 },
    bullnose: { name: "Bullnose Edge", price: 12 },
    ogee: { name: "Ogee Edge", price: 18 }
  };

  const thicknessPrices = {
    '15mm': { price: 0.8 },
    '20mm': { price: 1.0 },
    '30mm': { price: 1.4 },
    '40mm': { price: 1.8 }
  };

  const calculatePrice = () => {
    const length = parseFloat(dimensions.length) || 0;
    const width = parseFloat(dimensions.width) || 0;
    const area = length * width;
    
    if (area <= 0) return;

    const thicknessMultiplier = thicknessPrices[dimensions.thickness as keyof typeof thicknessPrices]?.price || 1;
    const finishPrice = finishPrices[options.finish as keyof typeof finishPrices]?.price || 0;
    const edgePrice = edgePrices[options.edge as keyof typeof edgePrices]?.price || 0;
    
    const materialCost = area * basePrice * thicknessMultiplier;
    const finishCost = area * finishPrice;
    const laborCost = area * 25; // $25 per sqm for cutting and preparation
    const edgeCostTotal = (length + width) * 2 * edgePrice; // Perimeter * edge price
    
    const installationCost = options.installation ? area * 35 : 0; // $35 per sqm
    const deliveryCost = options.delivery ? 150 : 0;
    
    const subtotal = materialCost + finishCost + laborCost + edgeCostTotal + installationCost + deliveryCost;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    setCalculation({
      materialCost: materialCost + edgeCostTotal,
      laborCost,
      finishCost,
      installationCost: installationCost + deliveryCost,
      subtotal,
      tax,
      total,
      area
    });
  };

  useEffect(() => {
    if (dimensions.length && dimensions.width) {
      calculatePrice();
    }
  }, [dimensions, options]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetCalculator = () => {
    setStep(1);
    setDimensions({ length: '', width: '', thickness: '20mm' });
    setOptions({ finish: 'polished', edge: 'straight', installation: true, delivery: true });
    setContact({ name: '', email: '', phone: '' });
    setCalculation(null);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-green-600">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Price Calculator
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Get instant pricing for {productName}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              ${basePrice}
            </div>
            <div className="text-sm text-gray-500">per square meter</div>
          </div>

          <Button
            onClick={() => setIsOpen(true)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Custom Price
          </Button>

          <div className="text-center text-xs text-gray-500">
            Includes material, labor, and finishing options
          </div>
        </CardContent>
      </Card>

      {/* Price Calculator Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Price Calculator: {productName}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Step {step} of 4 - Configure your project for accurate pricing
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          <div className="mt-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>

            {/* Step Content */}
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Project Dimensions</h3>
                    <p className="text-gray-600">Enter the measurements for your stone installation</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="length" className="text-sm font-medium text-gray-700">
                        Length (meters)
                      </Label>
                      <div className="relative">
                        <Input
                          id="length"
                          type="number"
                          placeholder="0.00"
                          value={dimensions.length}
                          onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                          className="pl-8"
                        />
                        <Ruler className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="width" className="text-sm font-medium text-gray-700">
                        Width (meters)
                      </Label>
                      <div className="relative">
                        <Input
                          id="width"
                          type="number"
                          placeholder="0.00"
                          value={dimensions.width}
                          onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                          className="pl-8"
                        />
                        <Ruler className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Thickness</Label>
                      <Select value={dimensions.thickness} onValueChange={(value) => setDimensions(prev => ({ ...prev, thickness: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15mm">15mm (Standard)</SelectItem>
                          <SelectItem value="20mm">20mm (Popular)</SelectItem>
                          <SelectItem value="30mm">30mm (Premium)</SelectItem>
                          <SelectItem value="40mm">40mm (Ultra Premium)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {dimensions.length && dimensions.width && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">
                          Total Area: {(parseFloat(dimensions.length) * parseFloat(dimensions.width)).toFixed(2)} m²
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Finish & Edge Options</h3>
                    <p className="text-gray-600">Choose your preferred finish and edge treatment</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Finish Options */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">Surface Finish</Label>
                      <div className="space-y-3">
                        {Object.entries(finishPrices).map(([key, finish]) => (
                          <div
                            key={key}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              options.finish === key 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setOptions(prev => ({ ...prev, finish: key }))}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{finish.name}</div>
                                <div className="text-sm text-gray-600">{finish.description}</div>
                              </div>
                              <div className="text-sm font-medium text-green-600">
                                {finish.price > 0 ? `+$${finish.price}/m²` : 'Included'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Edge Options */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">Edge Treatment</Label>
                      <div className="space-y-3">
                        {Object.entries(edgePrices).map(([key, edge]) => (
                          <div
                            key={key}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              options.edge === key 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setOptions(prev => ({ ...prev, edge: key }))}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-gray-900">{edge.name}</div>
                              <div className="text-sm font-medium text-green-600">
                                {edge.price > 0 ? `+$${edge.price}/lm` : 'Included'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Installation & Services</h3>
                    <p className="text-gray-600">Select additional services for your project</p>
                  </div>

                  <div className="space-y-4">
                    <div 
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        options.installation ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                      onClick={() => setOptions(prev => ({ ...prev, installation: !prev.installation }))}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Wrench className="h-6 w-6 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">Professional Installation</div>
                            <div className="text-sm text-gray-600">Expert installation by certified technicians</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">$35/m²</div>
                          <Badge variant={options.installation ? "default" : "secondary"} className="text-xs">
                            {options.installation ? "Included" : "Optional"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        options.delivery ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                      onClick={() => setOptions(prev => ({ ...prev, delivery: !prev.delivery }))}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <DollarSign className="h-6 w-6 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">Delivery & Handling</div>
                            <div className="text-sm text-gray-600">Safe delivery to your location</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">$150</div>
                          <Badge variant={options.delivery ? "default" : "secondary"} className="text-xs">
                            {options.delivery ? "Included" : "Optional"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && calculation && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Price Summary</h3>
                    <p className="text-gray-600">Complete breakdown for your {productName} project</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Price Breakdown */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Material & Cutting ({calculation.area.toFixed(2)}m²)</span>
                          <span className="font-medium">${calculation.materialCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Labor & Preparation</span>
                          <span className="font-medium">${calculation.laborCost.toFixed(2)}</span>
                        </div>
                        {calculation.finishCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Premium Finish</span>
                            <span className="font-medium">${calculation.finishCost.toFixed(2)}</span>
                          </div>
                        )}
                        {calculation.installationCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Installation & Delivery</span>
                            <span className="font-medium">${calculation.installationCost.toFixed(2)}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">${calculation.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (10%)</span>
                          <span className="font-medium">${calculation.tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-green-600">${calculation.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Contact Form */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Get Your Quote</CardTitle>
                        <CardDescription>
                          Enter your details to receive this quote via email
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="contact-name">Full Name</Label>
                          <Input
                            id="contact-name"
                            placeholder="John Smith"
                            value={contact.name}
                            onChange={(e) => setContact(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-email">Email Address</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            placeholder="john@example.com"
                            value={contact.email}
                            onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-phone">Phone Number</Label>
                          <Input
                            id="contact-phone"
                            placeholder="+1 (555) 123-4567"
                            value={contact.phone}
                            onChange={(e) => setContact(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          disabled={!contact.name || !contact.email}
                          onClick={() => {
                            alert(`Quote sent to ${contact.email}! Our team will contact you within 24 hours.`);
                            setIsOpen(false);
                            resetCalculator();
                          }}
                        >
                          Send Quote to Email
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <div className="flex space-x-2">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex items-center space-x-2"
                  >
                    <Minus className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  className="text-gray-600"
                >
                  Reset
                </Button>
              </div>

              {step < 4 && (
                <Button
                  onClick={handleNext}
                  disabled={step === 1 && (!dimensions.length || !dimensions.width)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                >
                  <span>Next</span>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}