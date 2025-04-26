
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Star } from "lucide-react";

const vets = [
  {
    id: 1,
    name: "Dr. Fatima Rahman",
    specialty: "General Care & Surgery",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800&h=800",
    stars: 4.9,
    location: "Main Clinic",
    distance: "0.5 miles",
    availability: "Available today",
  },
  {
    id: 2,
    name: "Dr. Ahmad Hassan",
    specialty: "Cardiology & Internal Medicine",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800&h=800",
    stars: 4.8,
    location: "North Branch",
    distance: "2.3 miles",
    availability: "Next available: Tomorrow",
  },
  {
    id: 3,
    name: "Dr. Zainab Malik",
    specialty: "Dermatology & Allergies",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800&h=800",
    stars: 4.7,
    location: "Main Clinic",
    distance: "0.5 miles",
    availability: "Available today",
  },
  {
    id: 4,
    name: "Dr. Omar Khan",
    specialty: "Orthopedic Surgery",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800&h=800",
    stars: 4.9,
    location: "North Branch",
    distance: "2.3 miles",
    availability: "Next available: Friday",
  },
  {
    id: 5,
    name: "Dr. Amira Syed",
    specialty: "Exotic Pets & Avian Medicine",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800&h=800",
    stars: 4.8,
    location: "Main Clinic",
    distance: "0.5 miles",
    availability: "Next available: Wednesday",
  },
];

const FindVet = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-pet-cream py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-pet-dark mb-4">Find Your Perfect Vet</h1>
              <p className="text-gray-600 mb-8">
                Browse our team of experienced veterinarians and find the perfect match for your pet's needs.
              </p>
              
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <Input 
                    placeholder="Enter your location" 
                    className="w-full pet-input pl-10"
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="general">General Care</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="dental">Dental</SelectItem>
                      <SelectItem value="exotic">Exotic Pets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white">
                  <Search size={18} className="mr-2" /> Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-pet-dark mb-6">Available Veterinarians</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vets.map((vet) => (
              <Card key={vet.id} className="pet-card overflow-hidden border-none">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={vet.image} 
                    alt={vet.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold text-pet-dark">{vet.name}</CardTitle>
                      <CardDescription className="text-pet-blue font-medium">{vet.specialty}</CardDescription>
                    </div>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">{vet.stars}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{vet.location}</span>
                    </div>
                    <div>{vet.distance}</div>
                  </div>
                  <div className="mb-4 text-sm font-medium text-green-600">
                    {vet.availability}
                  </div>
                  <Button className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white">Book Appointment</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-pet-blue text-pet-blue hover:bg-pet-cream">
              Load More Vets
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindVet;
