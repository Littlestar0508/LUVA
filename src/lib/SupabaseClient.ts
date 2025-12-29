import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabasePublishableDefaultKey = import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableDefaultKey
);
