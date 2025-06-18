
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download } from 'lucide-react';

interface Order {
  id: string;
  category: string;
  width: number;
  height: number;
  depth: number;
  material: string;
  colour: string;
  assembly: 'yes' | 'no';
  delivery: 'delivery' | 'pickup';
  address?: {
    street: string;
    suburb: string;
    postcode: string;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  finalPrice: number;
  status: string;
  createdAt: string;
}

const statusOptions = ['New', 'In Production', 'Ready for Delivery', 'Completed', 'Cancelled'];

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'In Production': 'bg-yellow-100 text-yellow-800',
  'Ready for Delivery': 'bg-green-100 text-green-800',
  'Completed': 'bg-gray-100 text-gray-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simple password protection
    const password = window.prompt('Enter admin password:');
    if (password === 'admin123') {
      setIsAuthenticated(true);
      loadOrders();
    } else {
      alert('Incorrect password');
      window.history.back();
    }
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const exportOrders = () => {
    const dataStr = JSON.stringify(orders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Gallery
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={exportOrders} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
              <Button onClick={loadOrders} variant="outline" size="sm">
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'In Production').length}
                </div>
                <div className="text-sm text-gray-600">In Production</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'Ready for Delivery').length}
                </div>
                <div className="text-sm text-gray-600">Ready for Delivery</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-amber-600">
                  ${orders.reduce((sum, order) => sum + order.finalPrice, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No orders found. Orders will appear here when customers place them.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Order ID</th>
                      <th className="text-left p-2">Customer</th>
                      <th className="text-left p-2">Product</th>
                      <th className="text-left p-2">Dimensions</th>
                      <th className="text-left p-2">Material</th>
                      <th className="text-left p-2">Assembly</th>
                      <th className="text-left p-2">Delivery</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-mono text-xs">{order.id}</td>
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-xs text-gray-500">{order.customer.email}</div>
                            <div className="text-xs text-gray-500">{order.customer.phone}</div>
                          </div>
                        </td>
                        <td className="p-2 capitalize">
                          {order.category?.replace(/([A-Z])/g, ' $1').trim()}
                        </td>
                        <td className="p-2 text-xs">
                          {order.width} × {order.height} × {order.depth} mm
                        </td>
                        <td className="p-2">
                          <div>{order.material}</div>
                          <div className="text-xs text-gray-500">{order.colour}</div>
                        </td>
                        <td className="p-2">
                          <Badge variant={order.assembly === 'yes' ? 'default' : 'secondary'}>
                            {order.assembly === 'yes' ? 'Yes' : 'No'}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div>{order.delivery === 'delivery' ? 'Delivery' : 'Pickup'}</div>
                          {order.delivery === 'delivery' && order.address && (
                            <div className="text-xs text-gray-500">
                              {order.address.suburb} {order.address.postcode}
                            </div>
                          )}
                        </td>
                        <td className="p-2 font-medium">
                          ${order.finalPrice.toLocaleString()}
                        </td>
                        <td className="p-2">
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue>
                                <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                                  {order.status}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2 text-xs">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
