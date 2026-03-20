import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rbtgzguekgxtjlivastz.supabase.co";
const supabaseKey = "sb_publishable_OY0AKV-bf1blsb6Po1yizA_N0o_O-Af";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase     