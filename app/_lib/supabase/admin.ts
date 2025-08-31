import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function createAdminClient() {
  return createServerClient(supabaseUrl, supabaseServiceRoleKey, {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
  });
}
