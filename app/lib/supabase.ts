import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ylmjgrnfjhxxfifplqbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsbWpncm5mamh4eGZpZnBscWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NjQ4MDcsImV4cCI6MjA2MDE0MDgwN30.3luoRrAia25KZ8lmZ2n47JBXWAq-Gd7vgz2uixDX6GI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
