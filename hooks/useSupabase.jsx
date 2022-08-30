import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
const useSupabase = () => {
  const { data: session } = useSession();
  if (session) {
    if (session.error) {
      return false;
    } else {
      const supabase = createClient(
        "https://xyzcompany.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrampmaHRweHZ2cHVhaW9reWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4ODAwMjQsImV4cCI6MTk3NzQ1NjAyNH0.HBEof3VuHL3_OgYC_05Z8q6aJNO2z0tDUbtflfDhZzU"
      );
      return supabase;
    }
  } else return false;
};

export default useSupabase;
