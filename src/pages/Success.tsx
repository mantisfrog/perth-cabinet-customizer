
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrder } from '../contexts/OrderContext';
import { Check, Home } from 'lucide-react';

const Success = () => {
  const { orderData, clearOrder } = useOrder();

  const handleNewOrder = () => {
    clearOrder();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-600">Order Placed Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-gray-600">
              <p className="text-lg mb-4">
                Thank you for choosing Perth Cabinet Works!
              </p>
              <p className="mb-2">
                Your custom {orderData.category?.replace(/([A-Z])/g, ' $1').trim()} order has been received and will be processed shortly.
              </p>
            </div>

            {orderData.customer && (
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h4 className="font-medium mb-3">Order Details</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Customer:</strong> {orderData.customer.name}</p>
                  <p><strong>Email:</strong> {orderData.customer.email}</p>
                  <p><strong>Phone:</strong> {orderData.customer.phone}</p>
                  <p><strong>Total:</strong> ${orderData.finalPrice?.toLocaleString()}</p>
                  <p><strong>Delivery:</strong> {orderData.delivery === 'delivery' ? 'Home Delivery' : 'Workshop Pickup'}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What's Next?</h4>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>✉️ You'll receive a confirmation email within the next few minutes</li>
                <li>📞 Our team will contact you within 24 hours to confirm details</li>
                <li>🔨 Production will begin within 2-3 business days</li>
                <li>📦 Estimated completion time: 2-4 weeks</li>
                <li>🚚 We'll schedule delivery/pickup when your order is ready</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-2">
                Contact us if you have any questions about your order:
              </p>
              <div className="text-sm">
                <p>📧 orders@perthcabinetworks.com.au</p>
                <p>📞 (08) 9123 4567</p>
                <p>🕐 Mon-Fri 8AM-5PM, Sat 9AM-3PM</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" onClick={handleNewOrder}>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Home className="w-4 h-4 mr-2" />
                  Place Another Order
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.print()}>
                Print Order Confirmation
              </Button>
            </div>

            <div className="text-xs text-gray-500 border-t pt-4">
              <p>
                This is a demonstration website. No real orders will be processed and no emails will be sent.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;
