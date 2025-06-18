
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Gallery' },
    { path: '/about-us', label: 'About Us' },
    { path: '/faq', label: 'FAQ' },
    { path: '/admin', label: 'Admin' }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-decoration-none">
              <h1 className="text-3xl font-bold text-gray-900">Perth Cabinet Works</h1>
              <p className="text-gray-600 mt-1">Handcrafted furniture for your home</p>
            </Link>
          </div>
          <nav className="flex space-x-4">
            {navItems.map(({ path, label }) => (
              <Link key={path} to={path}>
                <Button 
                  variant={location.pathname === path ? "default" : "outline"} 
                  size="sm"
                >
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
