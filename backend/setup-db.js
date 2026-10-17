/**
 * Setup script — creates the todos table in Supabase
 * Run: node setup-db.js
 */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setup() {
  console.log('🔗 Connecting to Supabase...');
  console.log('   URL:', process.env.SUPABASE_URL);

  // Test connection by trying to list tables
  const { data, error } = await supabase
    .from('todos')
    .select('count', { count: 'exact', head: true });

  if (error && error.code === '42P01') {
    console.log('📋 Table "todos" does not exist yet.');
    console.log('\n⚠️  The Supabase JS client cannot run raw DDL CREATE TABLE.');
    console.log('   Please create the table manually in Supabase:');
    console.log('\n   1. Go to: https://supabase.com/dashboard/project/hvnfywbyoeddxxirrjex');
    console.log('   2. Click "SQL Editor" in the left sidebar');
    console.log('   3. Run this SQL:\n');
    console.log(`CREATE TABLE IF NOT EXISTS todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON todos FOR ALL USING (true) WITH CHECK (true);`);
  } else if (error) {
    console.error('❌ Connection error:', error.message);
    console.error('   Code:', error.code);
  } else {
    console.log('✅ Table "todos" already exists and is reachable!');
    console.log('   Count:', data);
  }
}

setup();
