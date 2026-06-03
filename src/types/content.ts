export type ContentStatus = "draft" | "published";

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  favoriteArticleIds: string[];
  favoriteVerseIds: string[];
  favoriteVideoIds?: string[];
  startedPathIds: string[];
  newsletter: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  seoDescription: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string;
  keyVerse: string;
  practicalApplication: string;
  prayer: string;
  status: ContentStatus;
  publishedAt: string;
  readingTime: string;
}

export interface Feeling {
  id: string;
  label: string;
  slug: string;
  summary: string;
  verses: string[];
  explanation: string;
  prayer: string;
  action: string;
  recommendedArticleIds: string[];
  recommendedVideoIds: string[];
}

export interface Verse {
  id: string;
  topic: string;
  reference: string;
  text: string;
  explanation: string;
  context: string;
  application: string;
}

export interface PathLesson {
  id: string;
  title: string;
  duration: string;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  lessons: PathLesson[];
}

export interface Video {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  description: string;
  duration: string;
  topics: string[];
}

export interface NewsletterSubscriber {
  id: string;
  name: string;
  email: string;
  consent: boolean;
  createdAt: string;
}

export type Testament = "old" | "new";

export interface BibleBook {
  id: string;
  name: string;
  testament: Testament;
  order: number;
  chapterCount: number;
  slug: string;
  description: string;
  author: string;
  historicalContext: string;
  mainTheme: string;
  centralMessage: string;
  structure: string[];
  keyVerses: string[];
  gospelLinks: string[];
  timeline: string[];
  themes: string[];
  keywords: string[];
  visualSummary: string;
  videoId?: string;
  readingPlan: string[];
}

export interface BibleChapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  summary: string;
  verseCount?: number;
}

export interface BibleVerse {
  id: string;
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
  translation: string;
  themes: string[];
}

export interface VerseNote {
  id: string;
  verseId: string;
  explanation: string;
  practicalApplication: string;
  prayer: string;
  relatedArticles: string[];
  relatedVideos: string[];
}

export interface ReadingPlanDay {
  day: number;
  title: string;
  reference: string;
  reflection: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  slug: string;
  description: string;
  theme: string;
  durationDays: number;
  days: ReadingPlanDay[];
}

export interface UserBibleState {
  savedVerseIds: string[];
  highlightedVerseIds: string[];
  personalNotes: Record<string, string>;
  readingProgress: Record<string, number[]>;
  newsletterThemes: string[];
}
