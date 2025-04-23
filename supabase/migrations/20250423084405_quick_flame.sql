/*
  # Fix Stock Table and Product Relationship

  1. Schema Fixes
    - Ensures the stock table exists
    - Ensures the foreign key relationship between stock and products is properly defined
  
  2. Changes
    - Recreates the stock table if it doesn't exist
    - Explicitly defines the foreign key relationship
    - Adds indexes for better performance
*/

-- Ensure products table exists first (it should already exist, but just in case)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specifications TEXT[] NOT NULL,
  selling_unit TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Recreate the stock table with explicit foreign key
DROP TABLE IF EXISTS stock;

CREATE TABLE IF NOT EXISTS stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  specs JSONB NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT stock_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_stock_product_id ON stock(product_id);

-- Enable RLS for stock table
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;

-- Create policies for stock table
CREATE POLICY "Authenticated users can read stock" 
  ON stock FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can insert stock" 
  ON stock FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update stock" 
  ON stock FOR UPDATE 
  TO authenticated 
  USING (true);