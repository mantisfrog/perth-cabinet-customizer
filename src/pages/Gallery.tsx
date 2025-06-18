import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
const categories = [{
  id: 'kitchen',
  name: 'Kitchen Cabinets',
  description: 'Custom kitchen solutions with premium finishes',
  image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
  basePrice: 800
}, {
  id: 'wardrobe',
  name: 'Wardrobes',
  description: 'Spacious wardrobes tailored to your needs',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  basePrice: 1200
}, {
  id: 'entertainment',
  name: 'Entertainment Units',
  description: 'Modern entertainment centers for your living space',
  image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
  basePrice: 600
}, {
  id: 'storage',
  name: 'Storage Solutions',
  description: 'Versatile storage units for any room',
  image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
  basePrice: 400
}, {
  id: 'bathroom',
  name: 'Bathroom Vanities',
  description: 'Elegant vanities with modern styling',
  image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop',
  basePrice: 900
}, {
  id: 'office',
  name: 'Office Furniture',
  description: 'Professional office storage and desks',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  basePrice: 700
}];
const Gallery = () => {
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Perth Cabinet Works</h1>
              <p className="text-gray-600 mt-1">Handcrafted furniture for your home</p>
            </div>
            <Link to="/admin">
              <Button variant="outline" size="sm">Admin</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-100 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Custom Cabinets Made to Perfection
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            From kitchen cabinets to wardrobes, we create bespoke furniture solutions 
            that transform your space. Quality craftsmanship meets modern design.
          </p>
          <div className="flex justify-center">
            <img alt="Beautiful kitchen cabinet" className="rounded-lg shadow-2xl max-w-2xl w-full" src="/lovable-uploads/63332ada-2415-4c33-8810-2297c466e169.jpg" />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Product Range</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of custom furniture solutions. Each piece is crafted 
              with attention to detail and built to last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img src={category.image} alt={category.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-600">
                      From ${category.basePrice}
                    </span>
                    <Link to={`/customize/${category.id}`}>
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        Customize
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xl font-semibold mb-4">Perth Cabinet Works</h5>
              <p className="text-gray-400">
                Creating beautiful, functional furniture for Perth homes since 1995.
              </p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-4">Contact</h5>
              <p className="text-gray-400">123 Workshop Street<br />Perth WA 6000<br />Phone: (08) 9123 4567</p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-4">Services</h5>
              <p className="text-gray-400">Custom Design • Installation • Delivery • Repairs</p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Gallery;