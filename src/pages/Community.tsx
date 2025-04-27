
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, ThumbsUp, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data for community posts
const mockPosts = [
  {
    id: 1,
    author: "Jane Smith",
    avatar: null,
    title: "Looking for advice on puppy training",
    content: "I just got a new Labrador puppy and she's having trouble with basic commands. Any tips for helping a 3-month old puppy learn to sit and stay? I've tried treats but she gets too excited and forgets what we're doing.",
    date: "April 25, 2025",
    comments: 5,
    likes: 12,
    status: "approved"
  },
  {
    id: 2,
    author: "John Davis",
    avatar: null,
    title: "Cat food recommendations",
    content: "My senior cat has been turning away from her usual food. Any recommendations for brands that are good for older cats with sensitive stomachs? She's 15 years old and has always been picky, but lately it's getting worse.",
    date: "April 24, 2025",
    comments: 8,
    likes: 7,
    status: "approved"
  },
  {
    id: 3,
    author: "Michael Johnson",
    avatar: null,
    title: "Local pet-friendly parks",
    content: "I'm new to the area and looking for good parks where I can take my dog. Any suggestions for parks with fenced areas where dogs can run off-leash? Bonus points if there's a water feature for hot days!",
    date: "April 23, 2025",
    comments: 12,
    likes: 18,
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pet-dark mb-4">Pet Owner Community</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with other pet owners, share experiences, and get advice from our community.
            </p>
          </div>
          
          {/* Community Posts Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-pet-dark mb-6">Community Discussions</h2>
            
            <div className="space-y-6">
              {mockPosts.map(post => (
                <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-2 border-b">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-pet-blue text-white">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
                          <p className="text-sm text-gray-500">Posted by {post.author} • {post.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Approved
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="mb-6 text-gray-700">{post.content}</p>
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <ThumbsUp className="h-4 w-4" /> 
                          {post.likes} likes
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MessageSquare className="h-4 w-4" /> 
                          {post.comments} comments
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Create Post Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-6 w-6 text-pet-blue" />
              <h2 className="text-2xl font-bold text-pet-dark">Create a Post</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your topic?"
                  className="border-gray-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={5}
                  className="border-gray-300"
                  required
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="bg-pet-blue hover:bg-pet-blue/90 text-white flex items-center gap-2 w-full sm:w-auto">
                  <Send className="h-4 w-4" /> Submit Post
                </Button>
                
                <p className="text-sm text-gray-500 mt-2">
                  Your post will be reviewed by our administrators before it appears in the community.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
