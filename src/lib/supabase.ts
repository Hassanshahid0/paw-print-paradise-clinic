
import { createClient } from '@supabase/supabase-js';

// Get the URL and anon key from environment variables set by Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables! Make sure you've connected your Supabase project in the Lovable interface."
  );
}

// Create a Supabase client with error handling - use empty strings as fallbacks
// This will create a non-functioning client but prevents the app from crashing
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

