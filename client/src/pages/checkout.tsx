import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Bitcoin, Banknote, Wallet, Shield, CheckCircle } from "lucide-react";

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return language === 'fa' 
      ? `${price.toFixed(2)} تومان`
      : `$${price.toFixed(2)}`;
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: t("common.success"),
      description: "Payment processed successfully!",
    });
    
    clearCart();
    setIsProcessing(false);
  };

  return (
    <div className={`min-h-screen bg-stone-beige ${language === 'fa' ? 'font-vazir' : ''}`}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-stone-dark mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("payment.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="card" className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>{language === 'fa' ? 'کارت' : 'Card'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="wallet" className="flex items-center space-x-2">
                      <Wallet className="h-4 w-4" />
                      <span>{language === 'fa' ? 'کیف پول' : 'Wallet'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="flex items-center space-x-2">
                      <Bitcoin className="h-4 w-4" />
                      <span>{language === 'fa' ? 'کریپتو' : 'Crypto'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="persian" className="flex items-center space-x-2">
                      <Banknote className="h-4 w-4" />
                      <span>{language === 'fa' ? 'بانک ایرانی' : 'Persian'}</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">{t("payment.cardNumber")}</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">{t("payment.expiryDate")}</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">{t("payment.cvv")}</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardHolder">{t("payment.cardHolder")}</Label>
                      <Input id="cardHolder" placeholder="John Doe" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="wallet" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold mb-2">
                          {language === 'fa' ? 'پرداخت امن با کیف پول دیجیتال' : 'Secure Digital Wallet Payment'}
                        </h3>
                        <p className="text-stone-gray text-sm">
                          {language === 'fa' 
                            ? 'سریع، امن و راحت' 
                            : 'Fast, secure, and convenient'
                          }
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <Button 
                          variant="outline" 
                          className="p-4 h-auto border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                          onClick={() => handlePayment()}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">PP</span>
                            </div>
                            <div className="text-left">
                              <div className="font-semibold">PayPal</div>
                              <div className="text-sm text-stone-gray">Pay with your PayPal account</div>
                            </div>
                          </div>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="p-4 h-auto border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                          onClick={() => handlePayment()}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">🍎</span>
                            </div>
                            <div className="text-left">
                              <div className="font-semibold">Apple Pay</div>
                              <div className="text-sm text-stone-gray">Pay with Touch ID or Face ID</div>
                            </div>
                          </div>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="p-4 h-auto border-green-200 hover:border-green-400 hover:bg-green-50"
                          onClick={() => handlePayment()}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">G</span>
                            </div>
                            <div className="text-left">
                              <div className="font-semibold">Google Pay</div>
                              <div className="text-sm text-stone-gray">Pay with your Google account</div>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="crypto" className="space-y-4 mt-6">
                    <div className="text-center p-8 border-2 border-dashed border-stone-gray rounded-lg">
                      <Bitcoin className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {language === 'fa' ? 'پرداخت با ارز دیجیتال' : 'Cryptocurrency Payment'}
                      </h3>
                      <p className="text-stone-gray mb-4">
                        {language === 'fa' 
                          ? 'بیت کوین، اتریوم، تتر و سایر ارزهای دیجیتال پذیرفته می‌شود'
                          : 'Bitcoin, Ethereum, USDT and other cryptocurrencies accepted'
                        }
                      </p>
                      <div className="bg-stone-beige p-4 rounded-lg">
                        <p className="font-mono text-sm break-all">
                          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="persian" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="text-center p-6 border border-stone-gray rounded-lg">
                        <Banknote className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {language === 'fa' ? 'پرداخت از طریق بانک‌های ایرانی' : 'Persian Bank Payment'}
                        </h3>
                        <p className="text-stone-gray mb-4">
                          {language === 'fa' 
                            ? 'پرداخت امن از طریق درگاه‌های بانکی ایران'
                            : 'Secure payment through Iranian banking gateways'
                          }
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="p-4 h-auto">
                          <div className="text-center">
                            <div className="font-semibold">پارسیان</div>
                            <div className="text-sm text-stone-gray">Parsian Bank</div>
                          </div>
                        </Button>
                        <Button variant="outline" className="p-4 h-auto">
                          <div className="text-center">
                            <div className="font-semibold">ملت</div>
                            <div className="text-sm text-stone-gray">Mellat Bank</div>
                          </div>
                        </Button>
                        <Button variant="outline" className="p-4 h-auto">
                          <div className="text-center">
                            <div className="font-semibold">صادرات</div>
                            <div className="text-sm text-stone-gray">Saderat Bank</div>
                          </div>
                        </Button>
                        <Button variant="outline" className="p-4 h-auto">
                          <div className="text-center">
                            <div className="font-semibold">زرین‌پال</div>
                            <div className="text-sm text-stone-gray">ZarinPal</div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-gradient-stone hover:shadow-stone-lg text-white"
                >
                  {isProcessing 
                    ? t("common.loading")
                    : `${t("payment.processPayment")} ${formatPrice(getTotalPrice())}`
                  }
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-stone-gray">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(parseFloat(item.price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t("cart.total")}:</span>
                      <span className="text-stone-bronze">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}