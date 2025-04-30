
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, ThumbsUp, User, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Post {
  id: number | string;
  title: string;
  content: string;
  author: string;
  author_id?: string;
  created_at: string;
  image_url?: string | null;
  likes: number;
  comments: number;
  status: 'pending' | 'approved' | 'rejected';
  avatar?: string | null;
}

const Community = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();
  
  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // Format the posts for display
      const formattedPosts = data.map(post => ({
        ...post,
        comments: post.comments || 0,
        likes: post.likes || 0,
        author: post.author || 'Anonymous'
      }));
      
      setPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Failed to load posts",
        description: "There was an error loading community posts.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get current user (if logged in)
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      
      // Upload image if there is one
      let imageUrl = null;
      if (postImage) {
        const fileExt = postImage.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('community-images')
          .upload(fileName, postImage);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('community-images')
          .getPublicUrl(fileName);
          
        imageUrl = urlData.publicUrl;
      }
      
      // Insert post into database
      const { error: insertError } = await supabase
        .from('community_posts')
        .insert([
          {
            title,
            content,
            image_url: imageUrl,
            author: user ? user.email?.split('@')[0] : 'Guest User',
            author_id: user?.id,
            status: 'pending',
            likes: 0,
            comments: 0,
            created_at: new Date().toISOString()
          }
        ]);
        
      if (insertError) {
        throw insertError;
      }
      
      toast({
        title: "Post Submitted",
        description: "Your post has been submitted for review.",
      });
      
      // Reset form
      setTitle("");
      setContent("");
      setPostImage(null);
      setPreviewUrl(null);
      
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your post.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-pet-dark mb-6">Community Discussions</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-pet-blue" />
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map(post => (
                  <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-all duration-200">
                    <CardHeader className="pb-2 border-b">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3 items-center">
                          <Avatar className="h-10 w-10">
                            {post.avatar ? (
                              <AvatarImage src={post.avatar} alt={post.author} />
                            ) : (
                              <AvatarFallback className="bg-pet-blue text-white">
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
                            <p className="text-sm text-gray-500">Posted by {post.author} • {formatDate(post.created_at)}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Approved
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="mb-4 text-gray-700">{post.content}</p>
                      {post.image_url && (
                        <img 
                          src={post.image_url} 
                          alt="Post image" 
                          className="rounded-lg mb-4 max-h-96 w-full object-cover"
                        />
                      )}
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts available at the moment.</p>
              </div>
            )}
          </div>
          
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Image (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Upload preview" 
                        className="mx-auto h-32 w-auto object-contain"
                      />
                    ) : (
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-pet-blue hover:text-pet-blue/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pet-blue">
                        <span>Upload a photo</span>
                        <Input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageSelect}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="bg-pet-blue hover:bg-pet-blue/90 text-white flex items-center gap-2 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Submit Post
                    </>
                  )}
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
