
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Users, 
  FileText, 
  MessageSquare, 
  Shield, 
  Check, 
  X, 
  Edit,
  Plus,
  Trash2,
  Book,
  Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHeader, 
  TableHead, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for community posts needing approval
const pendingPosts = [
  {
    id: 1,
    author: "Robert Brown",
    title: "Question about exotic pet regulations",
    content: "I'm considering getting a bearded dragon. Are there any special permits required in our state?",
    date: "April 27, 2025",
    status: "pending"
  },
  {
    id: 2,
    author: "Lisa Chen",
    title: "Pet insurance recommendations",
    content: "Looking for recommendations on pet insurance for my two cats. Which providers have good coverage at reasonable prices?",
    date: "April 26, 2025",
    status: "pending"
  }
];

// Mock data for meal plans management
const mealPlansAdmin = [
  {
    id: 1,
    title: "Chicken & Rice Bowl",
    petType: "Dog",
    ageRange: "Adult",
    dateCreated: "April 20, 2025",
    status: "published"
  },
  {
    id: 2,
    title: "Fish Delight",
    petType: "Cat",
    ageRange: "All Ages",
    dateCreated: "April 15, 2025",
    status: "published"
  },
  {
    id: 3,
    title: "Veggie Mix for Small Breeds",
    petType: "Dog",
    ageRange: "Senior",
    dateCreated: "April 10, 2025",
    status: "published"
  },
  {
    id: 4,
    title: "Raw Diet Starter",
    petType: "Dog",
    ageRange: "Adult",
    dateCreated: "April 24, 2025",
    status: "draft"
  }
];

// Mock data for doctor management
const doctors = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "General Veterinary Medicine",
    email: "emily.johnson@petcare.com",
    phone: "(555) 123-4567",
    status: "active"
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialty: "Surgery",
    email: "michael.lee@petcare.com",
    phone: "(555) 234-5678",
    status: "active"
  },
  {
    id: 3,
    name: "Dr. Sarah Wilson",
    specialty: "Dermatology",
    email: "sarah.wilson@petcare.com",
    phone: "(555) 345-6789",
    status: "active"
  }
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("posts");
  
  const handleApprovePost = (id: number) => {
    // Here would go the logic to approve a post
    console.log(`Approving post ${id}`);
  };
  
  const handleRejectPost = (id: number) => {
    // Here would go the logic to reject a post
    console.log(`Rejecting post ${id}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-pet-dark mb-1">Admin Panel</h1>
              <p className="text-gray-500">Manage content, doctors, and user posts</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white">
                <Shield className="mr-2 h-4 w-4" /> Admin Settings
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pet-blue">{pendingPosts.length}</div>
                <p className="text-gray-500">awaiting approval</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Meal Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pet-blue">{mealPlansAdmin.filter(p => p.status === "published").length}</div>
                <p className="text-gray-500">published plans</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Veterinarians</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pet-blue">{doctors.filter(d => d.status === "active").length}</div>
                <p className="text-gray-500">active doctors</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Community Posts</span>
              </TabsTrigger>
              <TabsTrigger value="meal-plans" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Meal Plans</span>
              </TabsTrigger>
              <TabsTrigger value="doctors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Doctors</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pending Community Posts</h2>
              </div>
              
              <div className="space-y-6">
                {pendingPosts.map(post => (
                  <Card key={post.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <p className="text-sm text-gray-500">By: {post.author} on {post.date}</p>
                        </div>
                        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                          Pending Review
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{post.content}</p>
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => handleApprovePost(post.id)}
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                        >
                          <Check className="h-4 w-4" /> Approve
                        </Button>
                        <Button 
                          onClick={() => handleRejectPost(post.id)}
                          size="sm" 
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <X className="h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="meal-plans" className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Meal Plans Management</h2>
                <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white flex items-center gap-1">
                  <Plus className="h-4 w-4" /> New Meal Plan
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Pet Type</TableHead>
                    <TableHead>Age Range</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mealPlansAdmin.map(plan => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.title}</TableCell>
                      <TableCell>{plan.petType}</TableCell>
                      <TableCell>{plan.ageRange}</TableCell>
                      <TableCell>{plan.dateCreated}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          plan.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {plan.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Edit className="h-4 w-4" /> Edit
                          </Button>
                          <Button size="sm" variant="destructive" className="flex items-center gap-1">
                            <Trash2 className="h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="doctors" className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Doctor Management</h2>
                <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Doctor
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map(doctor => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>
                        <div>{doctor.email}</div>
                        <div className="text-xs text-gray-500">{doctor.phone}</div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Active
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> Schedule
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Edit className="h-4 w-4" /> Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
