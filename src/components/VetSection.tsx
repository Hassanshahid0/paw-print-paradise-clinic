
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";

const vets = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Care & Surgery",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800&h=800",
    stars: 4.9,
    location: "Main Clinic",
    bio: "Dr. Johnson has over 10 years of experience in veterinary medicine with a special interest in soft tissue surgery.",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology & Internal Medicine",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800&h=800",
    stars: 4.8,
    location: "North Branch",
    bio: "Dr. Chen is a board-certified veterinary cardiologist who has been with Pet Care for 7 years.",
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    specialty: "Dermatology & Allergies",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800&h=800",
    stars: 4.7,
    location: "Main Clinic",
    bio: "Dr. Patel specializes in treating skin conditions and allergies in all types of pets.",
  },
];

const VetSection = () => {
  const [visibleVets, setVisibleVets] = useState(3);
  
  return (
    <section className="py-16 bg-pet-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pet-dark">Meet Our Veterinarians</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our team of experienced and compassionate veterinarians is dedicated to providing the best care for your pets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vets.slice(0, visibleVets).map((vet) => (
            <Card key={vet.id} className="pet-card overflow-hidden border-none">
              <div className="h-64 overflow-hidden">
                <img 
                  src={vet.image} 
                  alt={vet.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <CardHeader>
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
                <div className="flex items-center text-gray-500 mb-3 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{vet.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{vet.bio}</p>
                <Button className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white">Book Appointment</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {visibleVets < vets.length && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => setVisibleVets(vets.length)}
              className="border-pet-blue text-pet-blue hover:bg-pet-cream"
            >
              View All Veterinarians
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VetSection;
