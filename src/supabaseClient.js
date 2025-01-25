import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qkusdwtljfsdmoadycta.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdXNkd3RsamZzZG1vYWR5Y3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MjkxNTUsImV4cCI6MjA0NzUwNTE1NX0.p-jLDiyJQxTC1RoYsWJqhs-stVU8emr9QOKOQ4wtoCU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
