export interface Product {
  id: string;
  name: string;
  specifications: string[];
  selling_unit: string;
  created_at: string;
}

export interface Stock {
  id: string;
  product_id: string;
  specs: Record<string, string>;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  created_at: string;
}

export interface Order {
  id: string;
  client_id: string;
  total_amount: number;
  status: string;
  created_at: string;
  client?: Client;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  specs: Record<string, string>;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface SpecValue {
  [key: string]: string | number;
}