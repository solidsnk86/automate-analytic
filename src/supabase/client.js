import { createClient } from "@supabase/supabase-js";
import ws from "ws";

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANNON_KEY, {
	realtime: {
		transport: ws,
	},
});