import { execFileSync } from "node:child_process";
import fs from "node:fs";

const channelUrl = process.argv[2] ?? "https://www.youtube.com/@ministerosiamouno/videos";
const outputPath = process.argv[3] ?? "src/data/channelVideos.ts";
const limit = Number(process.argv[4] ?? 50);

const raw = execFileSync("yt-dlp", [
  "--flat-playlist",
  "--playlist-end",
  String(limit),
  "--dump-json",
  channelUrl,
], { encoding: "utf8", maxBuffer: 1024 * 1024 * 20 });

const videos = raw
  .trim()
  .split(/\n+/)
  .filter(Boolean)
  .map((line, index) => {
    const item = JSON.parse(line);
    const title = normalizeTitle(item.title ?? "");
    const category = inferCategory(title);
    return {
      id: `ch${String(index + 1).padStart(2, "0")}`,
      title,
      category,
      youtubeId: item.id,
      description: "Video recente dal canale Daniele e Maria Pesce, selezionato per aiutarti a crescere nella fede e nella comprensione della Parola.",
      duration: item.duration_string ?? formatDuration(item.duration),
      topics: extractTopics(title),
    };
  });

const generatedAt = new Date().toISOString();
const source = `import type { Video } from "../types/content";

export const channelVideosSyncedAt = "${generatedAt}";
export const channelVideosSource = "${channelUrl}";

export const channelVideos: Video[] = ${JSON.stringify(videos, null, 2)};
`;

fs.writeFileSync(outputPath, source);
console.log(`Synced ${videos.length} videos from ${channelUrl}`);
console.log(`Updated ${outputPath}`);

function normalizeTitle(title) {
  return title.replace(/\s+/g, " ").trim();
}

function inferCategory(title) {
  const lower = title.toLowerCase();
  if (/paura|ansia|pesi|deserto|prove|stress|preoccup/.test(lower)) return "Pace e Ansia";
  if (/identit|figli|figlie|donna|uomini|cristiano|cristiana/.test(lower)) return "Identita";
  if (/salvezza|vangelo|cristo|croce|grazia|liber|demoni|spiriti|maledizioni/.test(lower)) return "Vangelo";
  if (/spirito santo|risveglio|adorazione|pregh|fede/.test(lower)) return "Fede";
  if (/mandato|regno|scopo|volont|chiamata/.test(lower)) return "Scopo della Vita";
  if (/testimon/.test(lower)) return "Testimonianze";
  return "Crescita Spirituale";
}

function extractTopics(title) {
  const stopWords = new Set(["come", "della", "delle", "degli", "dallo", "dalla", "daniele", "maria", "pesce", "with", "con", "che", "per", "non", "the"]);
  return Array.from(new Set(
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 4 && !stopWords.has(word))
      .slice(0, 8),
  ));
}

function formatDuration(duration) {
  if (!duration) return "";
  const total = Math.round(Number(duration));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${minutes}:${String(seconds).padStart(2, "0")}`;
}
