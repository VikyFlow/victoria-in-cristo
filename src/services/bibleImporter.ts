import type { BibleBook, BibleChapter, BibleVerse, VerseNote } from "../types/content";

export interface BibleImportPayload {
  books: BibleBook[];
  chapters: BibleChapter[];
  verses: BibleVerse[];
  verseNotes?: VerseNote[];
}

export function parseAuthorizedBibleJson(raw: string): BibleImportPayload {
  const parsed = JSON.parse(raw) as Partial<BibleImportPayload>;
  return {
    books: Array.isArray(parsed.books) ? parsed.books : [],
    chapters: Array.isArray(parsed.chapters) ? parsed.chapters : [],
    verses: Array.isArray(parsed.verses) ? parsed.verses : [],
    verseNotes: Array.isArray(parsed.verseNotes) ? parsed.verseNotes : [],
  };
}

export function parseAuthorizedBibleCsv(raw: string): BibleVerse[] {
  return raw
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line, index) => {
      const [bookId, chapterNumber, verseNumber, text, translation = "custom", themes = ""] = line.split(",");
      return {
        id: `${bookId}-${chapterNumber}-${verseNumber}-${index}`,
        bookId,
        chapterId: `${bookId}-${chapterNumber}`,
        chapterNumber: Number(chapterNumber),
        verseNumber: Number(verseNumber),
        text,
        translation,
        themes: themes.split("|").map((theme) => theme.trim()).filter(Boolean),
      };
    })
    .filter((verse) => verse.bookId && verse.chapterNumber && verse.verseNumber && verse.text);
}
