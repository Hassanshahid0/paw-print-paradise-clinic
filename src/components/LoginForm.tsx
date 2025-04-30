
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast: toastNotification } = useToast();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Check user role/metadata for admin or doctor status
      if (email.includes('admin')) {
        toast.success("Admin Login Successful", {
          description: "Welcome back to Pet Care Admin!"
        });
        navigate("/admin-panel");
      } else if (email.includes('doctor')) {
        toast.success("Doctor Login Successful", {
          description: "Welcome back to Pet Care Doctor Panel!"
        });
        navigate("/doctor-panel");
      } else {
        toast.success("Login Successful", {
          description: "Welcome back to Pet Care!"
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login Failed", {
        description: error.message || "Invalid email or password"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      toast.success("Account Created", {
        description: "Please check your email to verify your account."
      });
      
      // Reset form and switch to login view
      setEmail("");
      setPassword("");
      setIsLogin(true);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error("Registration Failed", {
        description: error.message || "Could not create your account"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Email Required", { 
        description: "Please enter your email to reset password" 
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success("Password Reset Email Sent", {
        description: "Check your inbox for instructions"
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error("Password Reset Failed", {
        description: error.message || "Could not send reset email"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isLogin ? handleSignIn() : handleSignUp();
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
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
              className="pet-input pr-10"
              disabled={isLoading}
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded text-pet-blue focus:ring-pet-blue" />
            <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
          </div>
          {isLogin && (
            <button 
              type="button" 
              onClick={handleResetPassword}
              className="text-sm text-pet-blue hover:underline"
              disabled={!email || isLoading}
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

        {/* Demo credentials section */}
        {isLogin && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-sm font-medium mb-2">Demo Credentials:</h3>
            <p className="text-xs text-gray-600 mb-1">Admin: admin@petwell.com / password123</p>
            <p className="text-xs text-gray-600 mb-1">Doctor: doctor@petwell.com / password123</p>
            <p className="text-xs text-gray-600">User: user@petwell.com / password123</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
