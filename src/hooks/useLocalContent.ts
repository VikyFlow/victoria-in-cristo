import { useMemo, useState } from "react";
import { contentService } from "../services/contentService";
import type { Article } from "../types/content";

export function useLocalContent() {
  const [version, setVersion] = useState(0);

  return useMemo(() => ({
    articles: contentService.getArticles(),
    publishedArticles: contentService.getPublishedArticles(),
    saveArticle(article: Article) {
      contentService.saveArticle(article);
      setVersion((current) => current + 1);
    },
    deleteArticle(id: string) {
      contentService.deleteArticle(id);
      setVersion((current) => current + 1);
    },
  }), [version]);
}
