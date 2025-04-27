import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dog, Cat, PawPrint } from "lucide-react";

// Mock data for meal recipes posted by admin
const mealRecipes = [
  {
    id: 1,
    title: "Chicken & Rice Bowl",
    petType: "Dog",
    ageRange: "Adult",
    ingredients: "Chicken breast, brown rice, carrots, peas, bone broth",
    nutritionalInfo: "High protein, moderate carbs, balanced vitamins",
    prepTime: "25 mins",
    publishedDate: "April 20, 2025",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  },
  {
    id: 2,
    title: "Fish Delight",
    petType: "Cat",
    ageRange: "All Ages",
    ingredients: "Salmon, sweet potato, spinach, fish oil",
    nutritionalInfo: "Omega-3 rich, grain-free, high protein",
    prepTime: "20 mins",
    publishedDate: "April 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  },
  {
    id: 3,
    title: "Veggie Mix for Small Breeds",
    petType: "Dog",
    ageRange: "Senior",
    ingredients: "Lentils, quinoa, zucchini, carrots, coconut oil",
    nutritionalInfo: "Low calorie, high fiber, easy to digest",
    prepTime: "30 mins",
    publishedDate: "April 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
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
              Nutritious, perfectly portioned meal recipes curated by our veterinary nutritionists.
            </p>
          </div>
          
          {/* Admin Posted Meal Recipes - Card Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mealRecipes.map(recipe => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{recipe.title}</CardTitle>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {recipe.petType === "Dog" ? <Dog className="h-3 w-3" /> : <Cat className="h-3 w-3" />}
                      {recipe.petType}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <PawPrint className="h-3 w-3" />
                      {recipe.ageRange}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold">Ingredients:</h4>
                      <p className="text-sm text-gray-600">{recipe.ingredients}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Nutritional Info:</h4>
                      <p className="text-sm text-gray-600">{recipe.nutritionalInfo}</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Prep time: {recipe.prepTime}</span>
                      <span>Posted: {recipe.publishedDate}</span>
                    </div>
                  </div>
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
