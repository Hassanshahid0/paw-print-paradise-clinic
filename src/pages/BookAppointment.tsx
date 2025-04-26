
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowRight, Video } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM"
];

const BookAppointment = () => {
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [selectedVet, setSelectedVet] = useState<string | undefined>(undefined);
  const [reason, setReason] = useState("");
  const { toast } = useToast();
  
  const handleContinue = () => {
    if (currentStep === 1) {
      if (!selectedVet) {
        toast({
          title: "Please select a veterinarian",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!selectedDate || !selectedTime) {
        toast({
          title: "Please select both date and time",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      toast({
        title: "Appointment Booked!",
        description: `Your ${appointmentType} appointment has been scheduled for ${format(selectedDate!, "PPP")} at ${selectedTime}`,
        duration: 5000,
      });
    }
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-12 bg-pet-cream min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-pet-dark text-center mb-2">Book an Appointment</h1>
            <p className="text-center text-gray-600 mb-8">
              Schedule a visit for your pet with our experienced veterinarians
            </p>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-pet-dark">
                      {currentStep === 1 && "Select Appointment Type & Vet"}
                      {currentStep === 2 && "Choose Date & Time"}
                      {currentStep === 3 && "Your Information"}
                    </CardTitle>
                    <CardDescription>
                      Step {currentStep} of 3
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step === currentStep 
                            ? "bg-pet-blue text-white" 
                            : step < currentStep 
                              ? "bg-pet-green text-white"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Step 1: Appointment Type & Vet */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Appointment Type</h3>
                      <Tabs 
                        value={appointmentType} 
                        onValueChange={setAppointmentType}
                        className="w-full"
                      >
                        <TabsList className="grid grid-cols-2 w-full">
                          <TabsTrigger value="in-person" className="text-base py-3">
                            In-Person Visit
                          </TabsTrigger>
                          <TabsTrigger value="virtual" className="text-base py-3">
                            <Video size={18} className="mr-2" /> Virtual Consult
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Select Veterinarian</h3>
                      <Select onValueChange={setSelectedVet}>
                        <SelectTrigger className="w-full pet-input">
                          <SelectValue placeholder="Choose a veterinarian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="dr-johnson">Dr. Sarah Johnson (General Care)</SelectItem>
                            <SelectItem value="dr-chen">Dr. Michael Chen (Cardiology)</SelectItem>
                            <SelectItem value="dr-patel">Dr. Aisha Patel (Dermatology)</SelectItem>
                            <SelectItem value="dr-williams">Dr. Robert Williams (Orthopedics)</SelectItem>
                            <SelectItem value="dr-thompson">Dr. Lisa Thompson (Exotic Pets)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Reason for Visit</h3>
                      <Textarea 
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please briefly describe your pet's symptoms or reason for visit"
                        className="pet-input"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 2: Date & Time */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Select Date</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="p-3 pointer-events-auto"
                            disabled={(date) => {
                              const today = new Date();
                              return date < today || date.getDay() === 0;
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Select Time</h3>
                        <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-72">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              className={`${
                                selectedTime === time ? "bg-pet-blue text-white" : "border-gray-300"
                              } text-sm`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {selectedDate && selectedTime && (
                      <div className="bg-pet-cream/50 p-4 rounded-lg mt-4">
                        <h4 className="font-medium text-pet-dark">Appointment Summary:</h4>
                        <p>
                          {appointmentType === "in-person" ? "In-Person Visit" : "Virtual Consultation"} on{" "}
                          {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Step 3: Pet & Owner Info */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Pet Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pet Name
                          </label>
                          <Input className="pet-input" placeholder="Pet's name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pet Type
                          </label>
                          <Select>
                            <SelectTrigger className="pet-input">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dog">Dog</SelectItem>
                              <SelectItem value="cat">Cat</SelectItem>
                              <SelectItem value="bird">Bird</SelectItem>
                              <SelectItem value="reptile">Reptile</SelectItem>
                              <SelectItem value="small-mammal">Small Mammal</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Breed
                          </label>
                          <Input className="pet-input" placeholder="Breed (if known)" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Age
                          </label>
                          <Input className="pet-input" placeholder="Age" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Your Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <Input className="pet-input" placeholder="Your first name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <Input className="pet-input" placeholder="Your last name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Input className="pet-input" type="email" placeholder="Your email address" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <Input className="pet-input" type="tel" placeholder="Your phone number" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-pet-cream/50 p-4 rounded-lg">
                      <h4 className="font-medium text-pet-dark">Appointment Summary:</h4>
                      <p>
                        {appointmentType === "in-person" ? "In-Person Visit" : "Virtual Consultation"} with{" "}
                        {selectedVet === "dr-johnson" && "Dr. Sarah Johnson"} 
                        {selectedVet === "dr-chen" && "Dr. Michael Chen"}
                        {selectedVet === "dr-patel" && "Dr. Aisha Patel"}
                        {selectedVet === "dr-williams" && "Dr. Robert Williams"}
                        {selectedVet === "dr-thompson" && "Dr. Lisa Thompson"}
                        {" "}on{" "}
                        {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Back
                    </Button>
                  )}
                  <Button 
                    className="ml-auto bg-pet-blue hover:bg-pet-blue/90 text-white"
                    onClick={handleContinue}
                  >
                    {currentStep < 3 ? 'Continue' : 'Book Appointment'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;
