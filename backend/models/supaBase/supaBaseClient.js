const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL; // Ensure this is defined in your .env file
const supabaseKey = process.env.SUPABASE_KEY; // Ensure this is defined in your .env file

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be defined');
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
