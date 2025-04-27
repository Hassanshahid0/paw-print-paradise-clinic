
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Search } from "lucide-react";

const LostFound = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-pet-cream py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-pet-dark text-center mb-6">Lost & Found Pets</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Help reunite lost pets with their families or find your missing pet. 
            Submit a listing or browse through reported pets in your area.
          </p>
          
          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MapPin size={18} />
                </div>
                <Input 
                  placeholder="Enter your location" 
                  className="pl-10"
                />
              </div>
              <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white">
                <Search size={18} className="mr-2" /> Search Area
              </Button>
            </div>
          </div>
          
          {/* Report Form */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-pet-dark mb-6">Report a Pet</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Type
                  </label>
                  <Input placeholder="e.g., Dog, Cat, Bird" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Breed
                  </label>
                  <Input placeholder="e.g., Labrador, Persian" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Last Seen
                </label>
                <Input placeholder="Enter the location where the pet was last seen" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea 
                  placeholder="Describe the pet's appearance, collar, tags, etc."
                  rows={4}
                />
              </div>
              
              <Button className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white">
                Submit Report
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LostFound;
