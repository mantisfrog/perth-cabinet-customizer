
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOrder } from '../contexts/OrderContext';
import { ArrowLeft } from 'lucide-react';

const Confirm = () => {
  const navigate = useNavigate();
  const { orderData, updateOrder } = useOrder();
  
  const [assembly, setAssembly] = useState<'yes' | 'no'>('no');
  const [delivery, setDelivery] = useState<'delivery' | 'pickup'>('pickup');
  const [address, setAddress] = useState({
    street: '',
    suburb: '',
    postcode: ''
  });

  if (!orderData.category || !orderData.basePrice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No order data found</h1>
          <Link to="/">
            <Button>Start New Order</Button>
          </Link>
        </div>
      </div>
    );
  }

  const assemblyMultiplier = assembly === 'yes' ? 1.1 : 1;
  const deliveryFee = delivery === 'delivery' ? 70 : 0;
  const finalPrice = Math.round((orderData.basePrice || 0) * assemblyMultiplier + deliveryFee);

  const handleProceed = () => {
    if (delivery === 'delivery' && (!address.street || !address.suburb || !address.postcode)) {
      alert('Please fill in the delivery address');
      return;
    }

    updateOrder({
      assembly,
      delivery,
      address: delivery === 'delivery' ? address : undefined,
      finalPrice
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Review Your Order</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="font-medium">Product:</div>
                <div className="capitalize">{orderData.category?.replace(/([A-Z])/g, ' $1').trim()}</div>
                
                <div className="font-medium">Dimensions:</div>
                <div>{orderData.width} × {orderData.height} × {orderData.depth} mm</div>
                
                <div className="font-medium">Material:</div>
                <div>{orderData.material}</div>
                
                <div className="font-medium">Colour:</div>
                <div>{orderData.colour}</div>
                
                <div className="font-medium">Base Price:</div>
                <div>${orderData.basePrice?.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          {/* Options and Delivery */}
          <Card>
            <CardHeader>
              <CardTitle>Options & Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Assembly Option */}
              <div>
                <Label className="text-base font-medium">Assembly Service</Label>
                <RadioGroup value={assembly} onValueChange={(value: 'yes' | 'no') => setAssembly(value)} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="assembly-no" />
                    <Label htmlFor="assembly-no">Flat-pack (No additional cost)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="assembly-yes" />
                    <Label htmlFor="assembly-yes">Professional Assembly (+10%)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Delivery Option */}
              <div>
                <Label className="text-base font-medium">Delivery</Label>
                <RadioGroup value={delivery} onValueChange={(value: 'delivery' | 'pickup') => setDelivery(value)} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Pickup from workshop (Free)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Home Delivery (+$70)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Delivery Address */}
              {delivery === 'delivery' && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Delivery Address</h4>
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={address.street}
                      onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="suburb">Suburb</Label>
                      <Input
                        id="suburb"
                        value={address.suburb}
                        onChange={(e) => setAddress(prev => ({ ...prev, suburb: e.target.value }))}
                        placeholder="Perth"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={address.postcode}
                        onChange={(e) => setAddress(prev => ({ ...prev, postcode: e.target.value }))}
                        placeholder="6000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {delivery === 'pickup' && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Workshop Address</h4>
                  <p className="text-sm text-gray-600">
                    Perth Cabinet Works<br />
                    123 Workshop Street<br />
                    Perth WA 6000<br />
                    Open: Mon-Fri 8AM-5PM, Sat 9AM-3PM
                  </p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Price Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>${orderData.basePrice?.toLocaleString()}</span>
                  </div>
                  {assembly === 'yes' && (
                    <div className="flex justify-between">
                      <span>Assembly (+10%):</span>
                      <span>+${Math.round((orderData.basePrice || 0) * 0.1).toLocaleString()}</span>
                    </div>
                  )}
                  {delivery === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span>+$70</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-amber-600">${finalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleProceed} className="w-full bg-amber-600 hover:bg-amber-700">
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
