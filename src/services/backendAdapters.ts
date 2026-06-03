export interface BackendAdapter {
  name: "local" | "supabase" | "firebase" | "headless-cms";
  description: string;
}

export const backendAdapters: BackendAdapter[] = [
  {
    name: "local",
    description: "Mock data plus localStorage for the first public prototype.",
  },
  {
    name: "supabase",
    description: "Ready path for Postgres tables, auth roles, row level security and image storage.",
  },
  {
    name: "firebase",
    description: "Ready path for Firestore collections, Firebase Auth and Cloud Storage.",
  },
  {
    name: "headless-cms",
    description: "Ready path for editorial workflows in tools like Sanity, Strapi or Contentful.",
  },
];
