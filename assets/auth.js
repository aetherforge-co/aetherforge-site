// ============================================================
// AETHERFORGE — shared Supabase auth client + helpers
// Included on any page that needs to know who's logged in
// (index.html header, account.html dashboard).
// The anon key below is meant to be public — it only grants
// what the Row Level Security policies in db/schema.sql allow.
// ============================================================
const SUPABASE_URL = 'https://zxzoxzzbktlxdoacxupa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4em94enpia3RseGRvYWN4dXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NTIyMjUsImV4cCI6MjEwMTAyODIyNX0.oXKff-ptYkdIZj-Hg0ZU7Z2qj2mKQxsLzqWMXy5n49k';

const afSb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function afGetUser(){
  const { data: { user } } = await afSb.auth.getUser();
  return user;
}

async function afSignUp(email, password){
  return afSb.auth.signUp({ email, password });
}

async function afSignIn(email, password){
  return afSb.auth.signInWithPassword({ email, password });
}

async function afSignOut(){
  return afSb.auth.signOut();
}

// --- Password recovery -------------------------------------------------
// Sends the "reset your password" email. redirectTo must be listed under
// Authentication > URL Configuration > Redirect URLs in the Supabase
// dashboard, or Supabase will refuse to send the user back here.
async function afResetPassword(email){
  return afSb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/account.html',
  });
}

// Called once the user is back on the site holding a recovery session,
// to set the new password.
async function afUpdatePassword(newPassword){
  return afSb.auth.updateUser({ password: newPassword });
}
