/* Generated from the Supabase project schema (supabase gen types typescript).
   Regenerate this file after any migration — do not hand-edit the Database type.

   The generator also emits a set of deep conditional helpers (Tables<>,
   TablesInsert<>, …). Those are omitted here in favour of the plain aliases at
   the foot of the file, which say the same thing and are readable in an error
   message. */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      order_items: {
        Row: {
          good: string;
          id: string;
          name: string;
          order_id: string;
          product_id: string | null;
          qty: number;
          slug: string;
          unit_price: number;
        };
        Insert: {
          good?: string;
          id?: string;
          name: string;
          order_id: string;
          product_id?: string | null;
          qty: number;
          slug: string;
          unit_price: number;
        };
        Update: {
          good?: string;
          id?: string;
          name?: string;
          order_id?: string;
          product_id?: string | null;
          qty?: number;
          slug?: string;
          unit_price?: number;
        };
        /* PostgREST embedded selects (`items:order_items(*)`) are typed from
           these, so they are load-bearing — not decoration. */
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          access_token: string;
          address_line: string;
          city: string;
          customer_name: string;
          email: string;
          id: string;
          note: string | null;
          order_number: string;
          phone: string | null;
          placed_at: string;
          postcode: string | null;
          shipping: number;
          status: Database["public"]["Enums"]["order_status"];
          subtotal: number;
          total: number;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          access_token?: string;
          address_line: string;
          city: string;
          customer_name: string;
          email: string;
          id?: string;
          note?: string | null;
          order_number: string;
          phone?: string | null;
          placed_at?: string;
          postcode?: string | null;
          shipping?: number;
          status?: Database["public"]["Enums"]["order_status"];
          subtotal: number;
          total: number;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          access_token?: string;
          address_line?: string;
          city?: string;
          customer_name?: string;
          email?: string;
          id?: string;
          note?: string | null;
          order_number?: string;
          phone?: string | null;
          placed_at?: string;
          postcode?: string | null;
          shipping?: number;
          status?: Database["public"]["Enums"]["order_status"];
          subtotal?: number;
          total?: number;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          alt: string;
          created_at: string;
          id: string;
          path: string;
          product_id: string;
          sort_order: number;
        };
        Insert: {
          alt?: string;
          created_at?: string;
          id?: string;
          path: string;
          product_id: string;
          sort_order?: number;
        };
        Update: {
          alt?: string;
          created_at?: string;
          id?: string;
          path?: string;
          product_id?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          counter: Database["public"]["Enums"]["counter"];
          created_at: string;
          dimensions: string;
          good: string;
          id: string;
          material: string;
          name: string;
          note: string;
          price: number;
          scale: number;
          slug: string;
          sort_order: number;
          status: Database["public"]["Enums"]["product_status"];
          stock: number;
          story: string[];
          updated_at: string;
        };
        Insert: {
          counter: Database["public"]["Enums"]["counter"];
          created_at?: string;
          dimensions?: string;
          good?: string;
          id?: string;
          material?: string;
          name: string;
          note?: string;
          price: number;
          scale?: number;
          slug: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["product_status"];
          stock?: number;
          story?: string[];
          updated_at?: string;
        };
        Update: {
          counter?: Database["public"]["Enums"]["counter"];
          created_at?: string;
          dimensions?: string;
          good?: string;
          id?: string;
          material?: string;
          name?: string;
          note?: string;
          price?: number;
          scale?: number;
          slug?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["product_status"];
          stock?: number;
          story?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          full_name: string | null;
          id: string;
          phone: string | null;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          full_name?: string | null;
          id: string;
          phone?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      get_order_by_token: {
        Args: { p_access_token: string; p_order_number: string };
        Returns: Json;
      };
      place_order: {
        Args: {
          p_address_line: string;
          p_city: string;
          p_customer_name: string;
          p_email: string;
          p_lines: Json;
          p_note?: string;
          p_phone?: string;
          p_postcode?: string;
        };
        Returns: {
          out_access_token: string;
          out_order_number: string;
          out_total: number;
        }[];
      };
    };
    Enums: {
      counter: "jewellery" | "house";
      order_status: "new" | "packing" | "shipped" | "delivered" | "cancelled";
      product_status: "draft" | "active" | "archived";
      user_role: "customer" | "admin";
    };
    CompositeTypes: { [_ in never]: never };
  };
};

type Public = Database["public"];

export type Tables<T extends keyof Public["Tables"]> = Public["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Public["Tables"]> = Public["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Public["Tables"]> = Public["Tables"][T]["Update"];
export type Enums<T extends keyof Public["Enums"]> = Public["Enums"][T];
