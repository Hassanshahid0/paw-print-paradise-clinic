
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Book, List } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";

// Mock data for meal plans
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

// Mock meal plan recipes posted by admin
const mealRecipes = [
  {
    id: 1,
    title: "Chicken & Rice Bowl",
    petType: "Dog",
    ageRange: "Adult",
    ingredients: "Chicken breast, brown rice, carrots, peas, bone broth",
    nutritionalInfo: "High protein, moderate carbs, balanced vitamins",
    prepTime: "25 mins",
    publishedDate: "April 20, 2025"
  },
  {
    id: 2,
    title: "Fish Delight",
    petType: "Cat",
    ageRange: "All Ages",
    ingredients: "Salmon, sweet potato, spinach, fish oil",
    nutritionalInfo: "Omega-3 rich, grain-free, high protein",
    prepTime: "20 mins",
    publishedDate: "April 15, 2025"
  },
  {
    id: 3,
    title: "Veggie Mix for Small Breeds",
    petType: "Dog",
    ageRange: "Senior",
    ingredients: "Lentils, quinoa, zucchini, carrots, coconut oil",
    nutritionalInfo: "Low calorie, high fiber, easy to digest",
    prepTime: "30 mins",
    publishedDate: "April 10, 2025"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
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
          
          {/* Admin Posted Meal Recipes */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-pet-dark">Healthy Meal Recipes</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <List className="h-4 w-4" /> List View
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Calendar
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipe Name</TableHead>
                    <TableHead>Pet Type</TableHead>
                    <TableHead>Age Range</TableHead>
                    <TableHead>Prep Time</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mealRecipes.map(recipe => (
                    <TableRow key={recipe.id}>
                      <TableCell className="font-medium">{recipe.title}</TableCell>
                      <TableCell>{recipe.petType}</TableCell>
                      <TableCell>{recipe.ageRange}</TableCell>
                      <TableCell>{recipe.prepTime}</TableCell>
                      <TableCell>{recipe.publishedDate}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Book className="h-4 w-4" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-pet-dark mb-4">Need a Custom Meal Plan?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our veterinary nutritionists can create a personalized meal plan tailored to your pet's specific needs.
            </p>
            <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white">
              Request Custom Plan
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MealPlans;
