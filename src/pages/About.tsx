
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, Star, Heart } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Dr. Ahmad Hassan",
      role: "Lead Veterinarian",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800&h=800",
      description: "Specializing in small animal medicine with 15 years of experience."
    },
    {
      name: "Dr. Fatima Rahman",
      role: "Senior Veterinarian",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800&h=800",
      description: "Expert in emergency and critical care medicine."
    },
    {
      name: "Dr. Zainab Malik",
      role: "Veterinary Surgeon",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800&h=800",
      description: "Specialized in orthopedic and soft tissue surgery."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-pet-cream py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-pet-dark text-center mb-6">
              Welcome to PetWell
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Founded by Dr. Ahmad Hassan in 2005, PetWell has been providing compassionate veterinary care
              for your beloved pets. Our mission is to ensure the health and happiness of every pet that
              comes through our doors.
            </p>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-pet-dark">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <Heart className="h-12 w-12 text-pet-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Compassionate Care</h3>
                <p className="text-gray-600">Treating every pet with love and kindness</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-pet-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">Providing the highest quality veterinary care</p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 text-pet-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">Using the latest medical technologies</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-pet-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">Building lasting relationships with pet families</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="py-16 bg-pet-cream">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-pet-dark">Our Expert Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-pet-blue font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
