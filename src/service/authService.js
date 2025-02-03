import supabase from "./supabaseClient";

const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
};

const signInWithEmail = async (email) => {
  // Converte o e-mail para lowercase para garantir a compatibilidade
  const normalizedEmail = email.toLowerCase();

  // Verifica se o e-mail está na tabela `allowed_users`
  const { data, error } = await supabase
    .from("allowed_users")
    .select("e_mail")
    .eq("e_mail", normalizedEmail)
    .single();

  if (error || !data) {
    throw new Error("Este e-mail não está autorizado para login.");
  }

  // Se autorizado, envia o Magic Link
  const { error: authError } = await supabase.auth.signInWithOtp({ email: normalizedEmail });

  if (authError) {
    throw new Error(authError.message);
  }
};

const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

const signOut = async () => {
  await supabase.auth.signOut();
};

export default { onAuthStateChange, signInWithEmail, getSession, signOut };
