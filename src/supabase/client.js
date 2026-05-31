import { createClient } from "@supabase/supabase-js";

process.loadEnvFile(".env");

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANNON_KEY);