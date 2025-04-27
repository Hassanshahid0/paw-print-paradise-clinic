
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-pet-cream py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pet-dark mb-4">Pet Owner Community</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with other pet owners, share experiences, and join events in your area.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-none shadow-md">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-pet-blue mb-4" />
                <CardTitle>Discussion Forums</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join conversations about pet care, training tips, and more.
                </p>
                <Button className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white">
                  Browse Forums
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <Users className="h-12 w-12 text-pet-blue mb-4" />
                <CardTitle>Pet Meetups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Organize or join local pet meetups and playdates.
                </p>
                <Button className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white">
                  Find Meetups
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <Calendar className="h-12 w-12 text-pet-blue mb-4" />
                <CardTitle>Events Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Stay updated on upcoming pet events and workshops.
                </p>
                <Button className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white">
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
