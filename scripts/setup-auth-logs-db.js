/**
 * Database Setup Script for Auth Logs
 * Run this to create the auth_logs table in your Neon database
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { sql } = require('@vercel/postgres');

async function setupAuthLogsTable() {
  try {
    console.log('🔧 Creating auth_logs table...');

    // Create the table
    await sql`
      CREATE TABLE IF NOT EXISTS auth_logs (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255),
        user_email VARCHAR(255),
        user_name VARCHAR(255),
        event VARCHAR(50) NOT NULL,
        ip_address VARCHAR(45),
        user_agent TEXT,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    console.log('✅ auth_logs table created');

    // Create indexes
    console.log('🔧 Creating indexes...');
    
    await sql`CREATE INDEX IF NOT EXISTS idx_auth_logs_user_id ON auth_logs(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_auth_logs_event ON auth_logs(event);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_auth_logs_created_at ON auth_logs(created_at DESC);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_auth_logs_user_email ON auth_logs(user_email);`;

    console.log('✅ Indexes created');

    // Insert a test log
    console.log('🔧 Inserting test log...');
    
    await sql`
      INSERT INTO auth_logs (user_id, user_email, user_name, event, ip_address, user_agent)
      VALUES ('test_setup', 'setup@test.com', 'Setup Test', 'sign_in', '127.0.0.1', 'Setup Script');
    `;

    console.log('✅ Test log inserted');

    // Verify
    const result = await sql`SELECT COUNT(*) as count FROM auth_logs;`;
    console.log(`\n✅ Setup complete! Database has ${result.rows[0].count} auth log(s)`);
    
    console.log('\n📋 Next steps:');
    console.log('1. Deploy to Vercel');
    console.log('2. Sign in/out to test auth tracking');
    console.log('3. Visit /admin/logs to see your auth history');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    console.error('\n💡 Make sure POSTGRES_URL is set in your .env.local file');
    process.exit(1);
  }
}

setupAuthLogsTable();
