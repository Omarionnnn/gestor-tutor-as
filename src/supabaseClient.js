import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yplsoywlxokqkkvwojyb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwbHNveXdseG9rcWtrdndvanliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MjkwNjcsImV4cCI6MjA1MzQwNTA2N30.-yz7Rm4Mp-2MeE3x1vr8YdOHI-sC59er6o1r042YtKI';
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
    },
});

export default supabase;
