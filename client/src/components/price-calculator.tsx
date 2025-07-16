import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calculator, Ruler, Package, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface PriceCalculatorProps {
  productId?: number;
  productName?: string;
  basePrice?: number;
}

interface CalculationData {
  area: number;
  thickness: string;
  finish: string;
  installation: boolean;
  customerEmail?: string;
}

export default function PriceCalculator({ productId, productName, basePrice = 50 }: PriceCalculatorProps) {
  const { t, language } = useLanguage();
  const [calculation, setCalculation] = useState<CalculationData>({
    area: 0,
    thickness: "20mm",
    finish: "polished",
    installation: false,
  });

  const [result, setResult] = useState<{
    materialCost: number;
    installationCost: number;
    totalCost: number;
  } | null>(null);

  const savePriceCalculation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/price-calculations", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });

  const calculatePrice = () => {
    const thicknessMultiplier = calculation.thickness === "30mm" ? 1.5 : calculation.thickness === "20mm" ? 1.2 : 1;
    const finishMultiplier = calculation.finish === "honed" ? 1.1 : calculation.finish === "polished" ? 1.3 : 1;
    
    const materialCost = calculation.area * basePrice * thicknessMultiplier * finishMultiplier;
    const installationCost = calculation.installation ? calculation.area * 25 : 0;
    const totalCost = materialCost + installationCost;

    const newResult = {
      materialCost,
      installationCost,
      totalCost,
    };

    setResult(newResult);

    // Save calculation
    if (productId) {
      savePriceCalculation.mutate({
        productId,
        ...calculation,
        totalPrice: totalCost,
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto glass-morph">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Calculator className="h-6 w-6 text-stone-bronze" />
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-stone-bronze to-stone-gold bg-clip-text text-transparent">
            Price Calculator
          </CardTitle>
        </div>
        <CardDescription>
          Get an instant estimate for your {productName || "stone"} project
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Area Input */}
        <div className="space-y-2">
          <Label htmlFor="area" className="flex items-center space-x-2">
            <Ruler className="h-4 w-4" />
            <span>Area (sq ft)</span>
          </Label>
          <Input
            id="area"
            type="number"
            placeholder="Enter area in square feet"
            value={calculation.area || ""}
            onChange={(e) => setCalculation(prev => ({ ...prev, area: parseFloat(e.target.value) || 0 }))}
            className="fluid-hover"
          />
        </div>

        {/* Thickness Selection */}
        <div className="space-y-2">
          <Label htmlFor="thickness" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Thickness</span>
          </Label>
          <Select value={calculation.thickness} onValueChange={(value) => setCalculation(prev => ({ ...prev, thickness: value }))}>
            <SelectTrigger className="fluid-hover">
              <SelectValue placeholder="Select thickness" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12mm">12mm - Standard</SelectItem>
              <SelectItem value="20mm">20mm - Premium</SelectItem>
              <SelectItem value="30mm">30mm - Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Finish Selection */}
        <div className="space-y-2">
          <Label htmlFor="finish">Surface Finish</Label>
          <Select value={calculation.finish} onValueChange={(value) => setCalculation(prev => ({ ...prev, finish: value }))}>
            <SelectTrigger className="fluid-hover">
              <SelectValue placeholder="Select finish" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="natural">Natural</SelectItem>
              <SelectItem value="honed">Honed</SelectItem>
              <SelectItem value="polished">Polished - Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Installation Option */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="installation"
            checked={calculation.installation}
            onChange={(e) => setCalculation(prev => ({ ...prev, installation: e.target.checked }))}
            className="rounded border-gray-300"
          />
          <Label htmlFor="installation" className="flex items-center space-x-2">
            <Truck className="h-4 w-4" />
            <span>Include Professional Installation (+$25/sq ft)</span>
          </Label>
        </div>

        {/* Calculate Button */}
        <Button 
          onClick={calculatePrice} 
          className="w-full bg-gradient-stone hover:opacity-90 text-white font-semibold py-3 magnetic"
          disabled={calculation.area <= 0}
        >
          Calculate Price
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-stone-cream/10 to-stone-gold/10 rounded-lg border border-stone-bronze/20 animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-4 text-center">Price Breakdown</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Material Cost:</span>
                <span className="font-semibold">${result.materialCost.toLocaleString()}</span>
              </div>
              
              {calculation.installation && (
                <div className="flex justify-between items-center">
                  <span>Installation Cost:</span>
                  <span className="font-semibold">${result.installationCost.toLocaleString()}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Cost:</span>
                <span className="text-stone-bronze">${result.totalCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 text-center">
              * Prices are estimates. Final pricing may vary based on specific requirements.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}