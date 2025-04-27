
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar, Send } from "lucide-react";
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

// Mock data for community posts
const mockPosts = [
  {
    id: 1,
    author: "Jane Smith",
    title: "Looking for advice on puppy training",
    content: "I just got a new Labrador puppy and she's having trouble with basic commands. Any tips?",
    date: "April 25, 2025",
    comments: 5,
    status: "approved"
  },
  {
    id: 2,
    author: "John Davis",
    title: "Cat food recommendations",
    content: "My senior cat has been turning away from her usual food. Any recommendations for brands that are good for older cats?",
    date: "April 24, 2025",
    comments: 8,
    status: "approved"
  },
  {
    id: 3,
    author: "Michael Johnson",
    title: "Local pet-friendly parks",
    content: "I'm new to the area and looking for good parks where I can take my dog. Any suggestions?",
    date: "April 23, 2025",
    comments: 12,
    status: "approved"
  }
];

const Community = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to submit a new post
    // For now we'll just reset the form
    setTitle("");
    setContent("");
    alert("Your post has been submitted for review!");
  };

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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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
          
          {/* Community Posts Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-pet-dark mb-6">Community Posts</h2>
            
            <div className="space-y-6">
              {mockPosts.map(post => (
                <Card key={post.id} className="border border-gray-100">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <p className="text-sm text-gray-500">Posted by {post.author} on {post.date}</p>
                      </div>
                      <span className="text-sm text-gray-500">{post.comments} comments</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.content}</p>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Comment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Create Post Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-pet-dark mb-6">Create a Post</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your topic?"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="bg-pet-blue hover:bg-pet-blue/90 text-white flex items-center gap-2">
                <Send className="h-4 w-4" /> Submit Post
              </Button>
              
              <p className="text-sm text-gray-500 mt-2">
                Your post will be reviewed by our administrators before it appears in the community.
              </p>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
