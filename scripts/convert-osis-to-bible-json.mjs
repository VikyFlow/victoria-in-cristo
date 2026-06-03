import fs from "node:fs";

const sourcePath = process.argv[2] ?? "ita-riveduta.osis.xml";
const outputPath = process.argv[3] ?? "src/data/bibleRiveduta.json";
const xml = fs.readFileSync(sourcePath, "utf8");

const booksMeta = [
  ["Gen", "gen", "Genesi", "old", 1],
  ["Exod", "exo", "Esodo", "old", 2],
  ["Lev", "lev", "Levitico", "old", 3],
  ["Num", "num", "Numeri", "old", 4],
  ["Deut", "deu", "Deuteronomio", "old", 5],
  ["Josh", "jos", "Giosue", "old", 6],
  ["Judg", "jdg", "Giudici", "old", 7],
  ["Ruth", "rut", "Rut", "old", 8],
  ["1Sam", "1sa", "1 Samuele", "old", 9],
  ["2Sam", "2sa", "2 Samuele", "old", 10],
  ["1Kgs", "1ki", "1 Re", "old", 11],
  ["2Kgs", "2ki", "2 Re", "old", 12],
  ["1Chr", "1ch", "1 Cronache", "old", 13],
  ["2Chr", "2ch", "2 Cronache", "old", 14],
  ["Ezra", "ezr", "Esdra", "old", 15],
  ["Neh", "neh", "Neemia", "old", 16],
  ["Esth", "est", "Ester", "old", 17],
  ["Job", "job", "Giobbe", "old", 18],
  ["Ps", "psa", "Salmi", "old", 19],
  ["Prov", "pro", "Proverbi", "old", 20],
  ["Eccl", "ecc", "Ecclesiaste", "old", 21],
  ["Song", "sng", "Cantico dei Cantici", "old", 22],
  ["Isa", "isa", "Isaia", "old", 23],
  ["Jer", "jer", "Geremia", "old", 24],
  ["Lam", "lam", "Lamentazioni", "old", 25],
  ["Ezek", "ezk", "Ezechiele", "old", 26],
  ["Dan", "dan", "Daniele", "old", 27],
  ["Hos", "hos", "Osea", "old", 28],
  ["Joel", "jol", "Gioele", "old", 29],
  ["Amos", "amo", "Amos", "old", 30],
  ["Obad", "oba", "Abdia", "old", 31],
  ["Jonah", "jon", "Giona", "old", 32],
  ["Mic", "mic", "Michea", "old", 33],
  ["Nah", "nam", "Naum", "old", 34],
  ["Hab", "hab", "Abacuc", "old", 35],
  ["Zeph", "zep", "Sofonia", "old", 36],
  ["Hag", "hag", "Aggeo", "old", 37],
  ["Zech", "zec", "Zaccaria", "old", 38],
  ["Mal", "mal", "Malachia", "old", 39],
  ["Matt", "mat", "Matteo", "new", 40],
  ["Mark", "mrk", "Marco", "new", 41],
  ["Luke", "luk", "Luca", "new", 42],
  ["John", "jhn", "Giovanni", "new", 43],
  ["Acts", "act", "Atti", "new", 44],
  ["Rom", "rom", "Romani", "new", 45],
  ["1Cor", "1co", "1 Corinzi", "new", 46],
  ["2Cor", "2co", "2 Corinzi", "new", 47],
  ["Gal", "gal", "Galati", "new", 48],
  ["Eph", "eph", "Efesini", "new", 49],
  ["Phil", "php", "Filippesi", "new", 50],
  ["Col", "col", "Colossesi", "new", 51],
  ["1Thess", "1th", "1 Tessalonicesi", "new", 52],
  ["2Thess", "2th", "2 Tessalonicesi", "new", 53],
  ["1Tim", "1ti", "1 Timoteo", "new", 54],
  ["2Tim", "2ti", "2 Timoteo", "new", 55],
  ["Titus", "tit", "Tito", "new", 56],
  ["Phlm", "phm", "Filemone", "new", 57],
  ["Heb", "heb", "Ebrei", "new", 58],
  ["Jas", "jas", "Giacomo", "new", 59],
  ["1Pet", "1pe", "1 Pietro", "new", 60],
  ["2Pet", "2pe", "2 Pietro", "new", 61],
  ["1John", "1jn", "1 Giovanni", "new", 62],
  ["2John", "2jn", "2 Giovanni", "new", 63],
  ["3John", "3jn", "3 Giovanni", "new", 64],
  ["Jude", "jud", "Giuda", "new", 65],
  ["Rev", "rev", "Apocalisse", "new", 66],
];

const metaByOsis = new Map(booksMeta.map(([osis, id, name, testament, order]) => [osis, { id, name, testament, order }]));
const chapterCounts = new Map();
const verseCounts = new Map();
const verses = [];

const versePattern = /<verse\s+osisID=['"]([^'"]+)['"]>([\s\S]*?)<\/verse>/g;
let match;
while ((match = versePattern.exec(xml))) {
  const [, osisId, rawText] = match;
  const [bookOsis, chapterRaw, verseRaw] = osisId.split(".");
  const meta = metaByOsis.get(bookOsis);
  if (!meta) continue;

  const chapterNumber = Number(chapterRaw);
  const verseNumber = Number(verseRaw);
  const chapterId = `${meta.id}-${chapterNumber}`;
  const text = normalizeText(decodeXml(rawText.replace(/<[^>]+>/g, " "))).replace(/\s+/g, " ").trim();

  chapterCounts.set(meta.id, Math.max(chapterCounts.get(meta.id) ?? 0, chapterNumber));
  verseCounts.set(chapterId, Math.max(verseCounts.get(chapterId) ?? 0, verseNumber));
  verses.push({
    id: `${meta.id}-${chapterNumber}-${verseNumber}`,
    bookId: meta.id,
    chapterId,
    chapterNumber,
    verseNumber,
    text,
    translation: "Riveduta 1990",
    themes: [],
  });
}

const books = booksMeta.map(([, id, name, testament, order]) => ({
  id,
  name,
  testament,
  order,
  chapterCount: chapterCounts.get(id) ?? 0,
  slug: slugify(name),
  description: "",
  author: "",
  historicalContext: "",
  mainTheme: "",
  centralMessage: "",
  structure: [],
  keyVerses: [],
  gospelLinks: [],
  timeline: [],
  themes: [],
  keywords: [],
  visualSummary: "",
  readingPlan: [],
}));

const chapters = books.flatMap((book) =>
  Array.from({ length: book.chapterCount }, (_, index) => {
    const chapterNumber = index + 1;
    return {
      id: `${book.id}-${chapterNumber}`,
      bookId: book.id,
      chapterNumber,
      summary: "",
      verseCount: verseCounts.get(`${book.id}-${chapterNumber}`) ?? 0,
    };
  }),
);

fs.writeFileSync(outputPath, `${JSON.stringify({ books, chapters, verses, verseNotes: [] }, null, 2)}\n`);
console.log(`Converted ${books.length} books, ${chapters.length} chapters, ${verses.length} verses to ${outputPath}`);

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)));
}

function normalizeText(value) {
  return value
    .replace(/\u0080/g, "€")
    .replace(/\u0082/g, "‚")
    .replace(/\u0083/g, "ƒ")
    .replace(/\u0084/g, "„")
    .replace(/\u0085/g, "…")
    .replace(/\u0086/g, "†")
    .replace(/\u0087/g, "‡")
    .replace(/\u0088/g, "ˆ")
    .replace(/\u0089/g, "‰")
    .replace(/\u008A/g, "Š")
    .replace(/\u008B/g, "‹")
    .replace(/\u008C/g, "Œ")
    .replace(/\u008E/g, "Ž")
    .replace(/\u0091/g, "‘")
    .replace(/\u0092/g, "’")
    .replace(/\u0093/g, "“")
    .replace(/\u0094/g, "”")
    .replace(/\u0095/g, "•")
    .replace(/\u0096/g, "–")
    .replace(/\u0097/g, "—")
    .replace(/\u0098/g, "˜")
    .replace(/\u0099/g, "™")
    .replace(/\u009A/g, "š")
    .replace(/\u009B/g, "›")
    .replace(/\u009C/g, "œ")
    .replace(/\u009E/g, "ž")
    .replace(/\u009F/g, "Ÿ")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "");
}
