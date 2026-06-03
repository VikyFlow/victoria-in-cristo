import { articles, categories, paths, tags, verses, videos } from "../data/mockData";
import type { Article, LearningPath, NewsletterSubscriber, Verse, Video } from "../types/content";
import { readStorage, writeStorage } from "./storage";

const articleKey = "nsqpc_articles";
const newsletterKey = "nsqpc_newsletter";

export const contentService = {
  getArticles(): Article[] {
    return readStorage<Article[]>(articleKey, articles);
  },
  getPublishedArticles(): Article[] {
    return this.getArticles().filter((article) => article.status === "published");
  },
  getArticleBySlug(slug: string): Article | undefined {
    return this.getArticles().find((article) => article.slug === slug);
  },
  saveArticle(article: Article) {
    const existing = this.getArticles();
    const next = existing.some((item) => item.id === article.id)
      ? existing.map((item) => (item.id === article.id ? article : item))
      : [article, ...existing];
    writeStorage(articleKey, next);
    return article;
  },
  deleteArticle(id: string) {
    writeStorage(articleKey, this.getArticles().filter((article) => article.id !== id));
  },
  getCategories: () => categories,
  getTags: () => tags,
  getVerses: (): Verse[] => verses,
  getPaths: (): LearningPath[] => paths,
  getVideos: (): Video[] => videos,
  getSubscribers(): NewsletterSubscriber[] {
    return readStorage<NewsletterSubscriber[]>(newsletterKey, []);
  },
  subscribe(name: string, email: string, consent: boolean) {
    const subscriber: NewsletterSubscriber = {
      id: crypto.randomUUID(),
      name,
      email,
      consent,
      createdAt: new Date().toISOString(),
    };
    writeStorage(newsletterKey, [subscriber, ...this.getSubscribers()]);
    return subscriber;
  },
};
