
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building, Award, Users, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-pet-cream py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-pet-dark text-center mb-6">
              About PetCare
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Providing compassionate veterinary care for your beloved pets since 2005. 
              Our mission is to keep your pets healthy and happy throughout every stage of their lives.
            </p>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <Building className="h-12 w-12 text-pet-blue mx-auto mb-4" />
                <div className="text-4xl font-bold text-pet-dark mb-2">2</div>
                <div className="text-gray-600">Locations</div>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-pet-blue mx-auto mb-4" />
                <div className="text-4xl font-bold text-pet-dark mb-2">15+</div>
                <div className="text-gray-600">Expert Veterinarians</div>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-pet-blue mx-auto mb-4" />
                <div className="text-4xl font-bold text-pet-dark mb-2">18</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-pet-blue mx-auto mb-4" />
                <div className="text-4xl font-bold text-pet-dark mb-2">24/7</div>
                <div className="text-gray-600">Emergency Care</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
