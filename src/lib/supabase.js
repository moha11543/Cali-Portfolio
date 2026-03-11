import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyz123.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';

// Debug: verify environment variables are loaded correctly
if (!import.meta.env.VITE_SUPABASE_URL) {
    console.error('⚠️ VITE_SUPABASE_URL is not set! Using fallback placeholder.');
}
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.error('⚠️ VITE_SUPABASE_ANON_KEY is not set! Using fallback placeholder.');
} else if (!import.meta.env.VITE_SUPABASE_ANON_KEY.startsWith('eyJ')) {
    console.warn('⚠️ VITE_SUPABASE_ANON_KEY does not look like a valid Supabase JWT (should start with "eyJ..."). Check your .env file.');
}

console.log('Supabase URL loaded:', supabaseUrl);
console.log('Supabase Key loaded:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'MISSING');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
