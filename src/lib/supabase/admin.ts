import { createClient } from "@supabase/supabase-js";

// Client de servidor com a secret key — ignora RLS/grants, uso interno confiável.
// Ainda não temos autenticação real de usuário (Fase futura), então todo acesso
// a dado do NEW OS passa por aqui em vez do client com cookie de sessão.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false } }
  );
}
