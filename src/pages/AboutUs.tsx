
import Navigation from '@/components/Navigation';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              We are an affordable, custom cabinet maker serving the Perth area, dedicated to quality 
              craftsmanship and friendly service. Our team of skilled artisans takes pride in creating 
              beautiful, functional furniture that transforms your living spaces and exceeds your expectations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To provide Perth homeowners with exceptional custom cabinetry solutions that combine 
              traditional craftsmanship with modern design, all at affordable prices.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-700">
              Quality materials, attention to detail, customer satisfaction, and honest pricing 
              are the foundations of everything we do.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
