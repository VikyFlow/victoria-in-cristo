import { bibleBooks, bibleChapters, bibleVerses, readingPlans, verseNotes } from "../data/bibleMockData";
import type { BibleBook, BibleChapter, BibleVerse, ReadingPlan, UserBibleState, VerseNote } from "../types/content";
import { parseAuthorizedBibleJson } from "./bibleImporter";
import { readStorage, writeStorage } from "./storage";

const bibleKey = "nsqpc_bible_dataset";
const bibleStateKey = "nsqpc_bible_state";

interface BibleDataset {
  books: BibleBook[];
  chapters: BibleChapter[];
  verses: BibleVerse[];
  notes: VerseNote[];
}

const fallbackDataset: BibleDataset = {
  books: bibleBooks,
  chapters: bibleChapters,
  verses: bibleVerses,
  notes: verseNotes,
};

let loadedDataset: BibleDataset | null = null;

export const bibleService = {
  getDataset(): BibleDataset {
    const dataset = loadedDataset ?? readStorage<BibleDataset>(bibleKey, fallbackDataset);
    return {
      ...dataset,
      books: dataset.books.map((book) => {
        const fallbackBook = fallbackDataset.books.find((item) => item.id === book.id);
        return {
          ...book,
          chapterCount: book.chapterCount ?? fallbackBook?.chapterCount ?? 1,
        };
      }),
    };
  },
  async loadFullDataset() {
    if (loadedDataset && loadedDataset.verses.length > fallbackDataset.verses.length) return loadedDataset;
    const response = await fetch("/data/bibleRiveduta.json");
    if (!response.ok) throw new Error("Unable to load Bible dataset");
    const imported = await response.json() as { books: BibleBook[]; chapters: BibleChapter[]; verses: BibleVerse[]; verseNotes?: VerseNote[] };
    loadedDataset = {
      books: imported.books,
      chapters: imported.chapters,
      verses: imported.verses,
      notes: imported.verseNotes ?? [],
    };
    return loadedDataset;
  },
  getBooks(testament?: "old" | "new") {
    const books = this.getDataset().books.sort((a, b) => a.order - b.order);
    return testament ? books.filter((book) => book.testament === testament) : books;
  },
  getBook(slug: string) {
    return this.getDataset().books.find((book) => book.slug === slug);
  },
  getChapters(bookId: string) {
    const dataset = this.getDataset();
    const book = dataset.books.find((item) => item.id === bookId);
    if (!book) return [];
    const stored = dataset.chapters.filter((chapter) => chapter.bookId === bookId);
    return Array.from({ length: book.chapterCount }, (_, index) => {
      const chapterNumber = index + 1;
      return stored.find((chapter) => chapter.chapterNumber === chapterNumber) ?? {
        id: `${bookId}-${chapterNumber}`,
        bookId,
        chapterNumber,
        summary: "",
      };
    });
  },
  getChapter(bookId: string, chapterNumber: number) {
    return this.getChapters(bookId).find((chapter) => chapter.chapterNumber === chapterNumber);
  },
  getVerses(bookId: string, chapterNumber?: number) {
    return this.getDataset().verses
      .filter((verse) => verse.bookId === bookId && (!chapterNumber || verse.chapterNumber === chapterNumber))
      .sort((a, b) => a.chapterNumber - b.chapterNumber || a.verseNumber - b.verseNumber);
  },
  getVerse(bookSlug: string, chapterNumber: number, verseNumber: number) {
    const book = this.getBook(bookSlug);
    if (!book) return undefined;
    return this.getDataset().verses.find((verse) => verse.bookId === book.id && verse.chapterNumber === chapterNumber && verse.verseNumber === verseNumber);
  },
  getNote(verseId: string) {
    return this.getDataset().notes.find((note) => note.verseId === verseId);
  },
  search(query: string) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const reference = parseReference(normalized);
    const dataset = this.getDataset();
    if (reference) {
      const book = dataset.books.find((item) => item.name.toLowerCase().startsWith(reference.book));
      return dataset.verses.filter((verse) => verse.bookId === book?.id && verse.chapterNumber === reference.chapter && (!reference.verse || verse.verseNumber === reference.verse));
    }
    return dataset.verses.filter((verse) => {
      const book = dataset.books.find((item) => item.id === verse.bookId);
      return `${book?.name} ${verse.text} ${verse.themes.join(" ")}`.toLowerCase().includes(normalized);
    });
  },
  getReadingPlans(): ReadingPlan[] {
    return readingPlans;
  },
  getUserState(userId: string): UserBibleState {
    const all = readStorage<Record<string, UserBibleState>>(bibleStateKey, {});
    return all[userId] ?? { savedVerseIds: [], highlightedVerseIds: [], personalNotes: {}, readingProgress: {}, newsletterThemes: [] };
  },
  saveUserState(userId: string, state: UserBibleState) {
    const all = readStorage<Record<string, UserBibleState>>(bibleStateKey, {});
    writeStorage(bibleStateKey, { ...all, [userId]: state });
  },
  importAuthorizedJson(raw: string) {
    const imported = parseAuthorizedBibleJson(raw);
    const current = this.getDataset();
    const next: BibleDataset = {
      books: imported.books.length ? imported.books : current.books,
      chapters: imported.chapters.length ? imported.chapters : current.chapters,
      verses: imported.verses.length ? imported.verses : current.verses,
      notes: imported.verseNotes?.length ? imported.verseNotes : current.notes,
    };
    loadedDataset = next;
    writeStorage(bibleKey, next);
    return next;
  },
};

function parseReference(query: string) {
  const match = query.match(/^([\p{L}\s]+)\s+(\d+)(?::(\d+))?$/u);
  if (!match) return null;
  return {
    book: match[1].trim(),
    chapter: Number(match[2]),
    verse: match[3] ? Number(match[3]) : undefined,
  };
}
