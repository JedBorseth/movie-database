import { createClient } from "@supabase/supabase-js";
function useSupabase() {
  const supabaseUrl = "https://lkjjfhtpxvvpuaiokydy.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrampmaHRweHZ2cHVhaW9reWR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MTg4MDAyNCwiZXhwIjoxOTc3NDU2MDI0fQ.mkZj8u3VmWOJz1oda2UqF50el3_S7GIURb90zResmIc";
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

export default useSupabase;
