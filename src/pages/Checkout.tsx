
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOrder } from '../contexts/OrderContext';
import { ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { orderData, updateOrder } = useOrder();
  
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  });

  if (!orderData.finalPrice) {
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

  const handlePayment = () => {
    if (!customer.name || !customer.phone || !customer.email) {
      alert('Please fill in all customer details');
      return;
    }

    // Generate order ID
    const orderId = 'PCW-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Create order object
    const order = {
      id: orderId,
      ...orderData,
      customer,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Simulate payment
    alert('Payment simulated - Order placed successfully!');
    
    updateOrder({ customer });
    navigate('/success');
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
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customer.name}
                  onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(08) 1234 5678"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• You'll receive an order confirmation email</li>
                  <li>• Our team will contact you within 24 hours</li>
                  <li>• Production time: 2-4 weeks</li>
                  <li>• We'll schedule delivery/pickup when ready</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary & Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Final Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Product:</span>
                  <span className="capitalize">{orderData.category?.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dimensions:</span>
                  <span>{orderData.width} × {orderData.height} × {orderData.depth} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Material & Colour:</span>
                  <span>{orderData.material} - {orderData.colour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Assembly:</span>
                  <span>{orderData.assembly === 'yes' ? 'Professional Assembly' : 'Flat-pack'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Delivery:</span>
                  <span>{orderData.delivery === 'delivery' ? 'Home Delivery' : 'Workshop Pickup'}</span>
                </div>
                {orderData.delivery === 'delivery' && orderData.address && (
                  <div className="flex justify-between">
                    <span className="font-medium">Address:</span>
                    <span className="text-right text-xs">
                      {orderData.address.street}<br />
                      {orderData.address.suburb} {orderData.address.postcode}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount:</span>
                  <span className="text-amber-600">${orderData.finalPrice?.toLocaleString()}</span>
                </div>
              </div>

              {/* Fake Payment Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Payment Method</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>🏦 Bank Transfer (Direct Deposit)</p>
                  <p>💳 Credit Card</p>
                  <p>💰 Cash on Pickup/Delivery</p>
                  <p className="text-xs mt-2">
                    * This is a demo - no real payment will be processed
                  </p>
                </div>
              </div>

              <Button 
                onClick={handlePayment} 
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                disabled={!customer.name || !customer.phone || !customer.email}
              >
                Pay Now - ${orderData.finalPrice?.toLocaleString()}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By placing this order, you agree to our terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
