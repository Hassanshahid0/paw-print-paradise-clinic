
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic Plan",
    price: "$29",
    description: "Perfect for puppies and kittens",
    features: [
      "Customized meal portions",
      "Basic nutritional guidance",
      "Monthly delivery",
      "Email support"
    ]
  },
  {
    name: "Premium Plan",
    price: "$49",
    description: "Ideal for adult pets",
    features: [
      "All Basic Plan features",
      "Premium ingredients",
      "Bi-weekly delivery",
      "Vet consultation",
      "24/7 support"
    ]
  },
  {
    name: "Special Diet",
    price: "$69",
    description: "For pets with specific needs",
    features: [
      "All Premium Plan features",
      "Specialized diet plans",
      "Weekly delivery",
      "Regular health check-ups",
      "Priority support"
    ]
  }
];

const MealPlans = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-pet-cream py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pet-dark mb-4">Pet Meal Plans</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nutritious, perfectly portioned meals delivered to your door. 
              Choose the plan that best fits your pet's needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-pet-dark">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-pet-blue mt-4 mb-2">{plan.price}</div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-pet-blue hover:bg-pet-blue/90 text-white">
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MealPlans;
