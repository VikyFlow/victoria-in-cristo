import { supabase } from "../lib/supabaseClient";
import { contentService as localService } from "./contentService";
import { readStorage, writeStorage } from "./storage";
import type {
  Article,
  Feeling,
  User,
  Video,
  LearningPath,
  NewsletterSubscriber,
  BibleBook,
  BibleVerse,
} from "../types/content";
import { articles as mockArticles, users as mockUsers, feelings as mockFeelings } from "../data/mockData";

// ------------------------------------------------------------------
// Se Supabase non è configurato usa localStorage come fallback
// ------------------------------------------------------------------
const isConfigured = () =>
  Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

// ------------------------------------------------------------------
// UTILS
// ------------------------------------------------------------------
const usersKey = "nsqpc_users";
const sessionKey = "nsqpc_session";

export const supabaseService = {
  // ======================== AUTH ========================
  async login(email: string, password: string): Promise<User | null> {
    if (!isConfigured()) {
      // fallback localStorage
      const users = readStorage<User[]>(usersKey, mockUsers);
      const found = users.find((u) => u.email === email && u.password === password);
      if (!found) return null;
      writeStorage(sessionKey, found.id);
      return found;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return null;

    // recupera profilo dalla tabella users
    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (!profile) {
      // se non esiste, crealo
      const { data: newProfile } = await supabase
        .from("users")
        .insert({
          id: data.user.id,
          name: data.user.email?.split("@")[0] ?? "Utente",
          email: data.user.email ?? "",
          role: "user",
        })
        .select()
        .single();

      return newProfile ? mapUserFromDB(newProfile) : null;
    }

    return mapUserFromDB(profile);
  },

  async register(name: string, email: string, password: string): Promise<User | null> {
    if (!isConfigured()) {
      const users = readStorage<User[]>(usersKey, mockUsers);
      if (users.some((u) => u.email === email)) return null;
      const created: User = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        role: "user",
        favoriteArticleIds: [],
        favoriteVerseIds: [],
        favoriteVideoIds: [],
        startedPathIds: [],
        newsletter: false,
      };
      writeStorage(usersKey, [created, ...users]);
      writeStorage(sessionKey, created.id);
      return created;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) return null;

    // crea profilo nella tabella users
    const { data: profile } = await supabase
      .from("users")
      .insert({
        id: data.user.id,
        name,
        email,
        role: "user",
      })
      .select()
      .single();

    return profile ? mapUserFromDB(profile) : null;
  },

  async getSession(): Promise<User | null> {
    if (!isConfigured()) {
      const sessionId = readStorage<string | null>(sessionKey, null);
      if (!sessionId) return null;
      const users = readStorage<User[]>(usersKey, mockUsers);
      return users.find((u) => u.id === sessionId) ?? null;
    }

    const { data } = await supabase.auth.getSession();
    if (!data.session) return null;

    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.session.user.id)
      .single();

    return profile ? mapUserFromDB(profile) : null;
  },

  async logout() {
    if (!isConfigured()) {
      writeStorage(sessionKey, null);
      return;
    }
    await supabase.auth.signOut();
  },

  async updateUser(user: User): Promise<User> {
    if (!isConfigured()) {
      const users = readStorage<User[]>(usersKey, mockUsers);
      const next = users.map((u) => (u.id === user.id ? user : u));
      writeStorage(usersKey, next);
      return user;
    }

    const { data } = await supabase
      .from("users")
      .update(mapUserForDB(user))
      .eq("id", user.id)
      .select()
      .single();

    return data ? mapUserFromDB(data) : user;
  },

  async getAllUsers(): Promise<User[]> {
    if (!isConfigured()) {
      return readStorage<User[]>(usersKey, mockUsers);
    }

    const { data } = await supabase.from("users").select("*");
    return (data ?? []).map(mapUserFromDB);
  },

  // ======================== ARTICOLI ========================
  async getArticles(): Promise<Article[]> {
    if (!isConfigured()) return localService.getArticles();

    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false });

    return (data ?? []).map(mapArticleFromDB);
  },

  async getPublishedArticles(): Promise<Article[]> {
    if (!isConfigured()) return localService.getPublishedArticles();

    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    return (data ?? []).map(mapArticleFromDB);
  },

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    if (!isConfigured()) return localService.getArticleBySlug(slug);

    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    return data ? mapArticleFromDB(data) : undefined;
  },

  async saveArticle(article: Article): Promise<Article> {
    if (!isConfigured()) return localService.saveArticle(article);

    const exists = await supabase
      .from("articles")
      .select("id")
      .eq("id", article.id)
      .single();

    if (exists.data) {
      const { data } = await supabase
        .from("articles")
        .update(mapArticleForDB(article))
        .eq("id", article.id)
        .select()
        .single();
      return data ? mapArticleFromDB(data) : article;
    }

    const { data } = await supabase
      .from("articles")
      .insert(mapArticleForDB(article))
      .select()
      .single();
    return data ? mapArticleFromDB(data) : article;
  },

  async deleteArticle(id: string) {
    if (!isConfigured()) return localService.deleteArticle(id);
    await supabase.from("articles").delete().eq("id", id);
  },

  // ======================== FEELINGS ========================
  async getFeelings(): Promise<Feeling[]> {
    if (!isConfigured()) return mockFeelings;

    const { data } = await supabase.from("feelings").select("*");
    return (data ?? []).map(mapFeelingFromDB);
  },

  // ======================== VIDEO ========================
  async getVideos(): Promise<Video[]> {
    if (!isConfigured()) return localService.getVideos();

    const { data } = await supabase.from("videos").select("*");
    return (data ?? []).map(mapVideoFromDB);
  },

  // ======================== PERCORSI ========================
  async getPaths(): Promise<LearningPath[]> {
    if (!isConfigured()) return localService.getPaths();

    const { data } = await supabase.from("learning_paths").select("*");
    return (data ?? []).map(mapPathFromDB);
  },

  // ======================== NEWSLETTER ========================
  async getSubscribers(): Promise<NewsletterSubscriber[]> {
    if (!isConfigured()) return localService.getSubscribers();

    const { data } = await supabase.from("newsletter_subscribers").select("*");
    return (data ?? []).map(mapSubscriberFromDB);
  },

  async subscribe(name: string, email: string, consent: boolean): Promise<NewsletterSubscriber> {
    if (!isConfigured()) return localService.subscribe(name, email, consent);

    const subscriber = { name, email, consent };
    const { data } = await supabase
      .from("newsletter_subscribers")
      .insert(subscriber)
      .select()
      .single();

    return data ? mapSubscriberFromDB(data) : { id: "", name, email, consent, createdAt: "" };
  },

  // ======================== STORAGE (immagini) ========================
  async uploadImage(file: File, bucket = "images"): Promise<string | null> {
    if (!isConfigured()) {
      // fallback: return URL locale
      return URL.createObjectURL(file);
    }

    const ext = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error || !data) {
      console.error("[Supabase] Upload error:", error);
      return null;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return urlData.publicUrl;
  },

  async deleteImage(path: string, bucket = "images") {
    if (!isConfigured()) return;
    await supabase.storage.from(bucket).remove([path]);
  },
};

// ======================== MAPPER ========================
function mapUserFromDB(row: Record<string, unknown>): User {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    password: "", // non esposta dal DB
    role: row.role as "user" | "admin",
    favoriteArticleIds: (row.favorite_article_ids ?? []) as string[],
    favoriteVerseIds: (row.favorite_verse_ids ?? []) as string[],
    favoriteVideoIds: (row.favorite_video_ids ?? []) as string[],
    startedPathIds: (row.started_path_ids ?? []) as string[],
    newsletter: (row.newsletter ?? false) as boolean,
  };
}

function mapUserForDB(user: User): Record<string, unknown> {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    favorite_article_ids: user.favoriteArticleIds,
    favorite_verse_ids: user.favoriteVerseIds,
    favorite_video_ids: user.favoriteVideoIds,
    started_path_ids: user.startedPathIds,
    newsletter: user.newsletter,
  };
}

function mapArticleFromDB(row: Record<string, unknown>): Article {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    seoDescription: (row.seo_description ?? "") as string,
    category: (row.category ?? "") as string,
    tags: (row.tags ?? []) as string[],
    coverImage: (row.cover_image ?? "") as string,
    content: (row.content ?? "") as string,
    keyVerse: (row.key_verse ?? "") as string,
    practicalApplication: (row.practical_application ?? "") as string,
    prayer: (row.prayer ?? "") as string,
    status: (row.status ?? "draft") as "draft" | "published",
    publishedAt: (row.published_at ?? new Date().toISOString()) as string,
    readingTime: (row.reading_time ?? "") as string,
  };
}

function mapArticleForDB(article: Article): Record<string, unknown> {
  return {
    title: article.title,
    slug: article.slug,
    seo_description: article.seoDescription,
    category: article.category,
    tags: article.tags,
    cover_image: article.coverImage,
    content: article.content,
    key_verse: article.keyVerse,
    practical_application: article.practicalApplication,
    prayer: article.prayer,
    status: article.status,
    published_at: article.publishedAt,
    reading_time: article.readingTime,
  };
}

function mapFeelingFromDB(row: Record<string, unknown>): Feeling {
  return {
    id: row.id as string,
    label: row.label as string,
    slug: row.slug as string,
    summary: (row.summary ?? "") as string,
    verses: (row.verses ?? []) as string[],
    explanation: (row.explanation ?? "") as string,
    prayer: (row.prayer ?? "") as string,
    action: (row.action ?? "") as string,
    recommendedArticleIds: (row.recommended_article_ids ?? []) as string[],
    recommendedVideoIds: (row.recommended_video_ids ?? []) as string[],
  };
}

function mapVideoFromDB(row: Record<string, unknown>): Video {
  return {
    id: row.id as string,
    title: row.title as string,
    category: (row.category ?? "") as string,
    youtubeId: row.youtube_id as string,
    description: (row.description ?? "") as string,
    duration: (row.duration ?? "") as string,
    topics: (row.topics ?? []) as string[],
  };
}

function mapPathFromDB(row: Record<string, unknown>): LearningPath {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    description: (row.description ?? "") as string,
    coverImage: (row.cover_image ?? "") as string,
    lessons: (row.lessons ?? []) as { id: string; title: string; duration: string }[],
  };
}

function mapSubscriberFromDB(row: Record<string, unknown>): NewsletterSubscriber {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    consent: (row.consent ?? false) as boolean,
    createdAt: (row.created_at ?? "") as string,
  };
}