-- Create auth_logs table for tracking authentication events
-- This stores all user sign-in, sign-out, and authentication activity

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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_auth_logs_user_id ON auth_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_logs_event ON auth_logs(event);
CREATE INDEX IF NOT EXISTS idx_auth_logs_created_at ON auth_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_logs_user_email ON auth_logs(user_email);

-- Add comment to table
COMMENT ON TABLE auth_logs IS 'Stores authentication activity logs for security monitoring';
COMMENT ON COLUMN auth_logs.event IS 'Event type: sign_in, sign_out, sign_up, failed_auth, session_created, session_revoked';
COMMENT ON COLUMN auth_logs.metadata IS 'Additional event metadata stored as JSON';
