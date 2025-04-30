
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Search, Upload, Image, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const LostFound = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [reportImage, setReportImage] = useState<File | null>(null);
  const [reportPreviewUrl, setReportPreviewUrl] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<'searching' | 'found' | 'not_found' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSearchResult(null);
    }
  };

  const handleReportImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReportImage(file);
      const url = URL.createObjectURL(file);
      setReportPreviewUrl(url);
    }
  };

  const handleSearch = async () => {
    if (!selectedImage) return;
    
    setIsSearching(true);
    setSearchResult('searching');

    try {
      // Upload image to Supabase Storage
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('pet-images')
        .upload(`search/${fileName}`, selectedImage);

      if (uploadError) {
        throw new Error('Error uploading image: ' + uploadError.message);
      }

      // Get image URL
      const { data: urlData } = supabase.storage
        .from('pet-images')
        .getPublicUrl(`search/${fileName}`);

      // Search in the lost pets database
      const { data: pets, error: searchError } = await supabase
        .from('lost_pets')
        .select('*');

      if (searchError) {
        throw new Error('Error searching database: ' + searchError.message);
      }

      // For now, just simulate no matches
      setTimeout(() => {
        setSearchResult('not_found');
        setIsSearching(false);
      }, 1500);

      // In a real app, you would use image comparison or ML
      // to find matches and set searchResult accordingly

    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Failed",
        description: "There was an error searching for the pet.",
        variant: "destructive",
      });
      setSearchResult(null);
      setIsSearching(false);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // Upload image if provided
      if (reportImage) {
        const fileExt = reportImage.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('pet-images')
          .upload(`lost/${fileName}`, reportImage);
        
        if (uploadError) {
          throw new Error('Error uploading image: ' + uploadError.message);
        }

        // Get image URL
        const { data: urlData } = supabase.storage
          .from('pet-images')
          .getPublicUrl(`lost/${fileName}`);
        
        imageUrl = urlData?.publicUrl;
      }

      // Save report to database
      const { error: insertError } = await supabase
        .from('lost_pets')
        .insert([
          {
            pet_type: petType,
            breed,
            location,
            description,
            image_url: imageUrl,
            status: 'pending', // pending, found, closed
            reported_at: new Date().toISOString(),
            user_id: (await supabase.auth.getUser()).data?.user?.id,
          },
        ]);

      if (insertError) {
        throw new Error('Error saving report: ' + insertError.message);
      }

      toast({
        title: "Report Submitted",
        description: "Your lost pet report has been submitted successfully.",
      });

      // Reset form and images
      setPetType("");
      setBreed("");
      setLocation("");
      setDescription("");
      setReportImage(null);
      setReportPreviewUrl(null);
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                disabled={!selectedImage || isSearching}
                className="w-full max-w-md bg-pet-blue hover:bg-pet-blue/90 text-white"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Image className="mr-2 h-5 w-5" />
                    Search Database
                  </>
                )}
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
              <form className="space-y-6" onSubmit={handleSubmitReport}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pet Type
                    </label>
                    <Input 
                      placeholder="e.g., Dog, Cat, Bird" 
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Breed
                    </label>
                    <Input 
                      placeholder="e.g., Labrador, Persian" 
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Last Seen
                  </label>
                  <Input 
                    placeholder="Enter the location where the pet was last seen" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea 
                    placeholder="Describe the pet's appearance, collar, tags, etc."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Additional Photos Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Photos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="space-y-1 text-center">
                      {reportPreviewUrl ? (
                        <img 
                          src={reportPreviewUrl} 
                          alt="Report preview" 
                          className="mx-auto h-32 w-auto object-contain"
                        />
                      ) : (
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-pet-blue hover:text-pet-blue/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pet-blue">
                          <span>Upload additional photos</span>
                          <Input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleReportImageSelect}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
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
