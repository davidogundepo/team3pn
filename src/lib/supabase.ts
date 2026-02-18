import { createClient } from '@supabase/supabase-js';

// These will be environment variables - you'll need to set them up
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          updated_at?: string;
        };
      };
      assessments: {
        Row: {
          id: string;
          user_id: string;
          quadrant: number;
          pathway: string;
          responses: any;
          cad_results: any;
          ai_insights: any;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quadrant: number;
          pathway: string;
          responses: any;
          cad_results: any;
          ai_insights?: any;
          completed_at?: string;
          created_at?: string;
        };
        Update: {
          quadrant?: number;
          pathway?: string;
          responses?: any;
          cad_results?: any;
          ai_insights?: any;
        };
      };
      mentor_matches: {
        Row: {
          id: string;
          mentee_id: string;
          mentor_id: string;
          status: 'pending' | 'active' | 'completed';
          created_at: string;
        };
      };
    };
  };
}
