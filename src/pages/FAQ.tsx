
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: "What are your delivery options and costs?",
    answer: "We offer flat-rate delivery throughout Perth for $70. Alternatively, you can pick up your order from our workshop at 123 Workshop Street, Perth WA 6000 free of charge."
  },
  {
    question: "What are your typical lead times?",
    answer: "Custom cabinet orders typically take 2-4 weeks from confirmation to completion, depending on the complexity and size of your order. We'll provide you with an estimated completion date when you place your order."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, bank transfer, and major credit cards (Visa, MasterCard, American Express). Payment is required in full before delivery or pickup."
  },
  {
    question: "Do you provide invoices for business customers?",
    answer: "Yes, we provide detailed invoices for all orders. Business customers can request invoices with ABN details for tax purposes. Simply let us know your requirements when placing your order."
  },
  {
    question: "What is your refund policy?",
    answer: "As all our cabinets are custom-made to your specifications, we cannot offer refunds on completed orders. However, if there are quality issues or manufacturing defects, we will repair or replace the item at no cost."
  },
  {
    question: "Do you offer assembly services?",
    answer: "Yes! We offer professional assembly services for an additional 10% of the cabinet price. Alternatively, you can choose flat-pack delivery if you prefer to assemble the cabinets yourself."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services, shipping, and policies.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-700">
              Contact us at (08) 9123 4567 or visit our workshop at 123 Workshop Street, Perth WA 6000
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
