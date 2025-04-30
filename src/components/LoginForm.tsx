
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        // Check user role/metadata for admin or doctor status
        const user = data.user;
        
        if (email.includes('admin')) {
          toast({
            title: "Admin Login Successful",
            description: "Welcome back to Pet Care Admin!",
            duration: 3000,
          });
          navigate("/admin-panel");
        } else if (email.includes('doctor')) {
          toast({
            title: "Doctor Login Successful",
            description: "Welcome back to Pet Care Doctor Panel!",
            duration: 3000,
          });
          navigate("/doctor-panel");
        } else {
          toast({
            title: "Login Successful",
            description: "Welcome back to Pet Care!",
            duration: 3000,
          });
          navigate("/");
        }
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Account Created",
          description: "Thank you for joining Pet Care. Please check your email to verify your account.",
          duration: 5000,
        });
        
        // Reset form
        setEmail("");
        setPassword("");
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: isLogin ? "Login Failed" : "Registration Failed",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-center mb-6">
        <div className="flex">
          <Button
            variant="ghost"
            className={`rounded-l-lg ${isLogin ? 'bg-pet-blue text-white' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            variant="ghost"
            className={`rounded-r-lg ${!isLogin ? 'bg-pet-blue text-white' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com" 
            required 
            className="pet-input"
            disabled={isLoading}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            required 
            className="pet-input"
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded text-pet-blue focus:ring-pet-blue" />
            <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
          </div>
          {isLogin && (
            <button 
              type="button" 
              onClick={async () => {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                  redirectTo: `${window.location.origin}/reset-password`,
                });
                if (!error && email) {
                  toast({
                    title: "Password Reset Email Sent",
                    description: "Check your inbox for password reset instructions",
                  });
                }
              }}
              className="text-sm text-pet-blue hover:underline"
              disabled={!email}
            >
              Forgot password?
            </button>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isLogin ? "Logging in..." : "Creating account..."}
            </>
          ) : (
            isLogin ? "Login" : "Create Account"
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
