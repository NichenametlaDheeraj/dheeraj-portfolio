import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qtebtkebxaoommcgdwwz.supabase.co";

const supabaseKey =
  "sb_publishable_x4kwaTuvSgKRAIZ16oAUnw_T5G_V6kN";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);