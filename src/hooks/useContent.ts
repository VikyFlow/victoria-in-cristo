import { useCallback, useEffect, useState } from "react";
import { supabaseService } from "../services/supabaseService";
import type { Article, NewsletterSubscriber } from "../types/content";

export function useContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [all, published, subs] = await Promise.all([
      supabaseService.getArticles(),
      supabaseService.getPublishedArticles(),
      supabaseService.getSubscribers(),
    ]);
    setArticles(all);
    setPublishedArticles(published);
    setSubscribers(subs);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    articles,
    publishedArticles,
    subscribers,
    loading,
    async saveArticle(article: Article) {
      await supabaseService.saveArticle(article);
      await load();
    },
    async deleteArticle(id: string) {
      await supabaseService.deleteArticle(id);
      await load();
    },
  };
}