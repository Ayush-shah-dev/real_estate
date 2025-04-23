/*
  # Initial Schema Setup for OmTraders Stock Management System

  1. New Tables
    - `products` - Stores product info (name, specifications, selling unit)
    - `stock` - Stores current inventory levels by product and specification
    - `clients` - Stores client/customer information
    - `orders` - Stores order header information
    - `order_items` - Stores individual items within orders
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specifications TEXT[] NOT NULL,
  selling_unit TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read products" 
  ON products FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can insert products" 
  ON products FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" 
  ON products FOR UPDATE 
  TO authenticated 
  USING (true);

-- Stock table
CREATE TABLE IF NOT EXISTS stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  specs JSONB NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE stock ENABLE ROW LEVEL SECURITY;

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

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read clients" 
  ON clients FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can insert clients" 
  ON clients FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients" 
  ON clients FOR UPDATE 
  TO authenticated 
  USING (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read orders" 
  ON orders FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can insert orders" 
  ON orders FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update orders" 
  ON orders FOR UPDATE 
  TO authenticated 
  USING (true);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  specs JSONB NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read order_items" 
  ON order_items FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can insert order_items" 
  ON order_items FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update order_items" 
  ON order_items FOR UPDATE 
  TO authenticated 
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stock_product_id ON stock(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON orders(client_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);