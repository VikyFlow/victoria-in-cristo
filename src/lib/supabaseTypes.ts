export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: "user" | "admin";
          favorite_article_ids: string[];
          favorite_verse_ids: string[];
          favorite_video_ids: string[];
          started_path_ids: string[];
          newsletter: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: "user" | "admin";
          favorite_article_ids?: string[];
          favorite_verse_ids?: string[];
          favorite_video_ids?: string[];
          started_path_ids?: string[];
          newsletter?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          seo_description: string;
          category: string;
          tags: string[];
          cover_image: string;
          content: string;
          key_verse: string;
          practical_application: string;
          prayer: string;
          status: "draft" | "published";
          published_at: string;
          reading_time: string;
          author_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          seo_description?: string;
          category?: string;
          tags?: string[];
          cover_image?: string;
          content?: string;
          key_verse?: string;
          practical_application?: string;
          prayer?: string;
          status?: "draft" | "published";
          published_at?: string;
          reading_time?: string;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["articles"]["Insert"]>;
      };
      feelings: {
        Row: {
          id: string;
          label: string;
          slug: string;
          summary: string;
          verses: string[];
          explanation: string;
          prayer: string;
          action: string;
          recommended_article_ids: string[];
          recommended_video_ids: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          slug: string;
          summary?: string;
          verses?: string[];
          explanation?: string;
          prayer?: string;
          action?: string;
          recommended_article_ids?: string[];
          recommended_video_ids?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["feelings"]["Insert"]>;
      };
      videos: {
        Row: {
          id: string;
          title: string;
          category: string;
          youtube_id: string;
          description: string;
          duration: string;
          topics: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category?: string;
          youtube_id: string;
          description?: string;
          duration?: string;
          topics?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["videos"]["Insert"]>;
      };
      learning_paths: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          cover_image: string;
          lessons: { id: string; title: string; duration: string }[];
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string;
          cover_image?: string;
          lessons?: { id: string; title: string; duration: string }[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["learning_paths"]["Insert"]>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          name: string;
          email: string;
          consent: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          consent?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>;
      };
      bible_books: {
        Row: {
          id: string;
          name: string;
          testament: "old" | "new";
          order: number;
          chapter_count: number;
          slug: string;
          description: string;
          author: string;
          historical_context: string;
          main_theme: string;
          central_message: string;
          structure: string[];
          key_verses: string[];
          gospel_links: string[];
          timeline: string[];
          themes: string[];
          keywords: string[];
          visual_summary: string;
          video_id: string | null;
          reading_plan: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          testament: "old" | "new";
          order: number;
          chapter_count?: number;
          slug: string;
          description?: string;
          author?: string;
          historical_context?: string;
          main_theme?: string;
          central_message?: string;
          structure?: string[];
          key_verses?: string[];
          gospel_links?: string[];
          timeline?: string[];
          themes?: string[];
          keywords?: string[];
          visual_summary?: string;
          video_id?: string;
          reading_plan?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bible_books"]["Insert"]>;
      };
      bible_verses: {
        Row: {
          id: string;
          book_id: string;
          chapter: number;
          verse: number;
          text: string;
          translation: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          chapter: number;
          verse: number;
          text: string;
          translation?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bible_verses"]["Insert"]>;
      };
      user_bible_states: {
        Row: {
          id: string;
          user_id: string;
          saved_verse_ids: string[];
          highlighted_verse_ids: string[];
          personal_notes: Record<string, string>;
          reading_progress: Record<string, number[]>;
          newsletter_themes: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          saved_verse_ids?: string[];
          highlighted_verse_ids?: string[];
          personal_notes?: Record<string, string>;
          reading_progress?: Record<string, number[]>;
          newsletter_themes?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_bible_states"]["Insert"]>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}