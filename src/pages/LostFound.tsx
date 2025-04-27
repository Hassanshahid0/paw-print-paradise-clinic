
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Search, Upload, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LostFound = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<'searching' | 'found' | 'not_found' | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSearchResult(null);
    }
  };

  const handleSearch = async () => {
    if (!selectedImage) return;
    
    setSearchResult('searching');
    // Simulate search delay
    setTimeout(() => {
      // For now, always show not found
      setSearchResult('not_found');
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-pet-cream py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-pet-dark text-center mb-6">Lost & Found Pets</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload a photo of a pet to search our database and help reunite lost pets with their families.
          </p>
          
          {/* Image Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-6">
              <div className="w-full">
                <label 
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-h-56 object-contain"
                      />
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
                      </>
                    )}
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                </label>
              </div>
              
              <Button 
                onClick={handleSearch}
                disabled={!selectedImage || searchResult === 'searching'}
                className="w-full max-w-md bg-pet-blue hover:bg-pet-blue/90 text-white"
              >
                <Image className="mr-2 h-5 w-5" />
                {searchResult === 'searching' ? 'Searching...' : 'Search Database'}
              </Button>
              
              {searchResult && (
                <Card className="w-full">
                  <CardContent className="pt-6">
                    {searchResult === 'searching' && (
                      <p className="text-center text-gray-600">Searching database...</p>
                    )}
                    {searchResult === 'found' && (
                      <p className="text-center text-green-600">Match found! Please contact support.</p>
                    )}
                    {searchResult === 'not_found' && (
                      <p className="text-center text-gray-600">
                        No matching pets found in our database. Would you like to submit a lost pet report?
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          {/* Report Form */}
          {searchResult === 'not_found' && (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-pet-dark mb-6">Submit a Lost Pet Report</h2>
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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LostFound;

