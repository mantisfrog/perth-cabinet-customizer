
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrder } from '../contexts/OrderContext';
import { ArrowLeft } from 'lucide-react';

const basePrices = {
  MDF: 50,
  Plywood: 80,
  'Solid Timber': 150
};

const materials = ['MDF', 'Plywood', 'Solid Timber'];
const colours = ['White', 'Oak', 'Walnut', 'Cherry', 'Maple', 'Black'];

const categoryNames = {
  kitchen: 'Kitchen Cabinets',
  wardrobe: 'Wardrobes',
  entertainment: 'Entertainment Units',
  storage: 'Storage Solutions',
  bathroom: 'Bathroom Vanities',
  office: 'Office Furniture'
};

const Customize = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { orderData, updateOrder } = useOrder();

  const [dimensions, setDimensions] = useState({
    width: orderData.width || 1200,
    height: orderData.height || 2000,
    depth: orderData.depth || 600
  });
  const [material, setMaterial] = useState(orderData.material || '');
  const [colour, setColour] = useState(orderData.colour || '');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (material && dimensions.width && dimensions.height && dimensions.depth) {
      const basePrice = basePrices[material as keyof typeof basePrices];
      const volume = (dimensions.width * dimensions.height * dimensions.depth) / 1e9;
      const calculatedPrice = basePrice * volume;
      setPrice(Math.round(calculatedPrice));
    }
  }, [material, dimensions]);

  const handleNext = () => {
    if (!material || !colour || !price) {
      alert('Please fill in all fields');
      return;
    }

    updateOrder({
      category: category || '',
      ...dimensions,
      material,
      colour,
      basePrice: price
    });
    navigate('/confirm');
  };

  if (!category || !categoryNames[category as keyof typeof categoryNames]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link to="/">
            <Button>Back to Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gallery
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Customize Your {categoryNames[category as keyof typeof categoryNames]}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Product Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dimensions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dimensions (mm)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      value={dimensions.width}
                      onChange={(e) => setDimensions(prev => ({ ...prev, width: Number(e.target.value) }))}
                      min="100"
                      max="3000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      value={dimensions.height}
                      onChange={(e) => setDimensions(prev => ({ ...prev, height: Number(e.target.value) }))}
                      min="100"
                      max="3000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="depth">Depth</Label>
                    <Input
                      id="depth"
                      type="number"
                      value={dimensions.depth}
                      onChange={(e) => setDimensions(prev => ({ ...prev, depth: Number(e.target.value) }))}
                      min="100"
                      max="1000"
                    />
                  </div>
                </div>
              </div>

              {/* Material */}
              <div>
                <Label htmlFor="material">Material</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((mat) => (
                      <SelectItem key={mat} value={mat}>
                        {mat} (${basePrices[mat as keyof typeof basePrices]}/m³)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Colour */}
              <div>
                <Label htmlFor="colour">Colour/Finish</Label>
                <Select value={colour} onValueChange={setColour}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select colour" />
                  </SelectTrigger>
                  <SelectContent>
                    {colours.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preview and Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Preview & Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Product Preview */}
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-sm mb-2">3D Preview</div>
                    <div className="text-xs">
                      {dimensions.width} × {dimensions.height} × {dimensions.depth} mm
                    </div>
                    {material && <div className="text-xs mt-1">{material} - {colour}</div>}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Price Calculation</h4>
                  {material ? (
                    <div className="space-y-1 text-sm">
                      <div>Material: {material} (${basePrices[material as keyof typeof basePrices]}/m³)</div>
                      <div>Volume: {((dimensions.width * dimensions.height * dimensions.depth) / 1e9).toFixed(3)} m³</div>
                      <div className="text-lg font-bold text-amber-600 mt-2">
                        Base Price: ${price.toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">Select material to see pricing</div>
                  )}
                </div>

                {/* Next Button */}
                <Button 
                  onClick={handleNext} 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={!material || !colour || !price}
                >
                  Next: Review Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customize;
