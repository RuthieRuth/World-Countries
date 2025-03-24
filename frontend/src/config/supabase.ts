// This runs superbase connection. Also attached the open weather api key to the export

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const weatherAPI =import.meta.env.VITE_OPEN_WEATHER_API;
const googleMapAPI = import.meta.env.VITE_GOOGLE_MAP_API;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export { weatherAPI , googleMapAPI };