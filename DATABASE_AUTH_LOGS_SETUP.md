# Database-Backed Auth Logging Setup Guide

## ✅ What Was Implemented

Your authentication logging system now uses **Neon PostgreSQL database** for permanent storage instead of in-memory storage.

### Changes Made:
1. **Created `auth_logs` table schema** (scripts/setup-auth-logs-table.sql)
2. **New database logger** (lib/security/auth-logger-db.ts) - Uses SQL queries
3. **Updated all API routes** to use database storage:
   - `/api/auth/track` - Saves auth events to database
   - `/api/admin/logs` - Reads from database
   - `/api/webhooks/clerk` - Logs webhook events to database
4. **Auto-setup script** (scripts/setup-auth-logs-db.js)

## 🔧 Setup Instructions

### Step 1: Set Up Neon Database Table

You need to create the `auth_logs` table in your Neon database. **Choose one method:**

#### Option A: Using Neon Dashboard (Recommended)
1. Go to [Neon Console](https://console.neon.tech/)
2. Select your database
3. Click **"SQL Editor"**
4. Copy and paste the contents of `scripts/setup-auth-logs-table.sql`
5. Click **"Run"**

#### Option B: Using the Setup Script
1. Make sure your `POSTGRES_URL` in Vercel is correct
2. Run: `node scripts/setup-auth-logs-db.js`

### Step 2: Verify Vercel Environment Variables

Make sure these are set in Vercel:
- `POSTGRES_URL` - Your Neon database connection string
- `CLERK_PUBLISHABLE_KEY` - For Clerk authentication
- `CLERK_SECRET_KEY` - For Clerk authentication

### Step 3: Deploy

The code is already pushed to GitHub. Vercel will automatically deploy.

## 🎉 How It Works Now

### User Signs In/Out:
1. **AuthEventTracker** (client component) detects auth state change
2. Calls `/api/auth/track` with user info
3. **Database**: Event is saved to `auth_logs` table in Neon
4. **Persists forever** - won't be cleared on server restart

### Viewing Logs:
1. Admin visits `/admin/logs`
2. Page queries database via `/api/admin/logs`
3. **Shows all events** from all server instances
4. **Complete history** of all sign-ins/sign-outs

### What's Tracked:
- ✅ **Sign ins** - User authentication
- ✅ **Sign outs** - User logout
- ✅ **Sign ups** - New user registration
- ✅ **Failed auth** - Failed login attempts
- ✅ **Session events** - Via Clerk webhooks

## 📊 Database Schema

```sql
CREATE TABLE auth_logs (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),           -- Clerk user ID
  user_email VARCHAR(255),         -- User email
  user_name VARCHAR(255),          -- User full name
  event VARCHAR(50) NOT NULL,      -- Event type
  ip_address VARCHAR(45),          -- IP address
  user_agent TEXT,                 -- Browser/device info
  metadata JSONB,                  -- Additional data
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes for Performance:
- `user_id` - Fast user lookups
- `event` - Filter by event type
- `created_at` - Sort by time
- `user_email` - Search by email

## 🧪 Testing

1. **Deploy to Vercel** (auto-deploys from GitHub)
2. **Sign out and sign back in** on your deployed site
3. **Visit `/admin/logs`**
4. **You should see your sign-in event!**

Or click **"Generate Demo Logs"** button on the Auth Logs page to create sample data.

## 🔍 Verification

Check if table exists:
```sql
SELECT COUNT(*) FROM auth_logs;
```

View recent logs:
```sql
SELECT * FROM auth_logs ORDER BY created_at DESC LIMIT 10;
```

## ⚠️ Important Notes

- **Permanent storage**: Logs are stored forever (until you delete them)
- **All instances share data**: Every Vercel serverless function reads from same database
- **Real tracking**: Every sign-in/out is automatically logged
- **Admin only**: Only users with `role: admin` can view logs

## 🐛 Troubleshooting

### "No logs appearing"
- Check Vercel logs for database errors
- Verify `POSTGRES_URL` is set correctly
- Ensure auth_logs table was created
- Try clicking "Generate Demo Logs" button

### "Database connection error"
- Verify `POSTGRES_URL` environment variable in Vercel
- Check Neon database is active (not suspended)
- Ensure database table exists

### "Permission denied"
- Make sure your user has `role: admin` in Clerk
- Sign out and sign back in to refresh session

## 📝 Next Steps

1. ✅ Table created in Neon database
2. ✅ Code deployed to Vercel
3. ⏳ Test sign-in tracking
4. ⏳ Set up Clerk webhooks (optional) for comprehensive tracking

---

**Status**: ✅ Database-backed auth logging is ready!  
**Deploy**: Pushing to GitHub now - Vercel will auto-deploy  
**Test**: Sign in/out and check `/admin/logs`
