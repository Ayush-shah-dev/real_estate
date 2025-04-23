export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          specifications: string[]
          selling_unit: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          specifications: string[]
          selling_unit: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          specifications?: string[]
          selling_unit?: string
          created_at?: string
        }
      }
      stock: {
        Row: {
          id: string
          product_id: string
          specs: Json
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          specs: Json
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          specs?: Json
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          contact: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          contact?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          contact?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          client_id: string
          total_amount: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          total_amount: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          total_amount?: number
          status?: string
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          specs: Json
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          specs: Json
          quantity: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          specs?: Json
          quantity?: number
          created_at?: string
        }
      }
    }
  }
}