/*
  # Create initial users

  1. Creates three users with specified credentials:
    - admin@gmail.com (Admin)
    - bshah3671@gmail.com (User)
    - bhavesh@gmail.com (User)
*/

-- Create users using Supabase Auth
SELECT supabase_auth.create_user(
  'admin@gmail.com',
  'ayush_2005',
  'Admin User',
  true, -- email_confirmed
  'authenticated'
);

SELECT supabase_auth.create_user(
  'bshah3671@gmail.com',
  'Ayush_2005',
  'Ayush Shah',
  true, -- email_confirmed
  'authenticated'
);

SELECT supabase_auth.create_user(
  'bhavesh@gmail.com',
  'bhavesh@1973',
  'Bhavesh Shah',
  true, -- email_confirmed
  'authenticated'
);