-- ============================================================
-- SCHEMA COMPLETO per Victoria in Cristo
-- Esegui tutto questo SQL nel SQL Editor di Supabase
-- ============================================================

-- 1. TABELLA UTENTI (sync con Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  favorite_article_ids TEXT[] NOT NULL DEFAULT '{}',
  favorite_verse_ids   TEXT[] NOT NULL DEFAULT '{}',
  favorite_video_ids   TEXT[] NOT NULL DEFAULT '{}',
  started_path_ids     TEXT[] NOT NULL DEFAULT '{}',
  newsletter     BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELLA ARTICOLI
CREATE TABLE IF NOT EXISTS public.articles (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  seo_description     TEXT NOT NULL DEFAULT '',
  category            TEXT NOT NULL DEFAULT '',
  tags                TEXT[] NOT NULL DEFAULT '{}',
  cover_image         TEXT NOT NULL DEFAULT '',
  content             TEXT NOT NULL DEFAULT '',
  key_verse           TEXT NOT NULL DEFAULT '',
  practical_application TEXT NOT NULL DEFAULT '',
  prayer              TEXT NOT NULL DEFAULT '',
  status              TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  reading_time        TEXT NOT NULL DEFAULT '',
  author_id           UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABELLA EMOZIONI / FEELINGS
CREATE TABLE IF NOT EXISTS public.feelings (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label                   TEXT NOT NULL,
  slug                    TEXT NOT NULL UNIQUE,
  summary                 TEXT NOT NULL DEFAULT '',
  verses                  TEXT[] NOT NULL DEFAULT '{}',
  explanation             TEXT NOT NULL DEFAULT '',
  prayer                  TEXT NOT NULL DEFAULT '',
  action                  TEXT NOT NULL DEFAULT '',
  recommended_article_ids TEXT[] NOT NULL DEFAULT '{}',
  recommended_video_ids   TEXT[] NOT NULL DEFAULT '{}',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TABELLA VIDEO
CREATE TABLE IF NOT EXISTS public.videos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT '',
  youtube_id  TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  duration    TEXT NOT NULL DEFAULT '',
  topics      TEXT[] NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. TABELLA PERCORSI DI CRESCITA
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  lessons     JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. TABELLA ISCRITTI NEWSLETTER
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  consent    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. TABELLA LIBRI BIBLICI
CREATE TABLE IF NOT EXISTS public.bible_books (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  testament         TEXT NOT NULL CHECK (testament IN ('old','new')),
  "order"           INT NOT NULL,
  chapter_count     INT NOT NULL DEFAULT 0,
  slug              TEXT NOT NULL UNIQUE,
  description       TEXT NOT NULL DEFAULT '',
  author            TEXT NOT NULL DEFAULT '',
  historical_context TEXT NOT NULL DEFAULT '',
  main_theme        TEXT NOT NULL DEFAULT '',
  central_message   TEXT NOT NULL DEFAULT '',
  structure         TEXT[] NOT NULL DEFAULT '{}',
  key_verses        TEXT[] NOT NULL DEFAULT '{}',
  gospel_links      TEXT[] NOT NULL DEFAULT '{}',
  timeline          TEXT[] NOT NULL DEFAULT '{}',
  themes            TEXT[] NOT NULL DEFAULT '{}',
  keywords          TEXT[] NOT NULL DEFAULT '{}',
  visual_summary    TEXT NOT NULL DEFAULT '',
  video_id          TEXT DEFAULT NULL,
  reading_plan      TEXT[] NOT NULL DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. TABELLA VERSETTI BIBLICI
CREATE TABLE IF NOT EXISTS public.bible_verses (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id      UUID NOT NULL REFERENCES public.bible_books(id) ON DELETE CASCADE,
  chapter      INT NOT NULL,
  verse        INT NOT NULL,
  text         TEXT NOT NULL,
  translation  TEXT NOT NULL DEFAULT 'Riveduta',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. TABELLA STATO BIBBIA UTENTE
CREATE TABLE IF NOT EXISTS public.user_bible_states (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  saved_verse_ids       TEXT[] NOT NULL DEFAULT '{}',
  highlighted_verse_ids TEXT[] NOT NULL DEFAULT '{}',
  personal_notes        JSONB NOT NULL DEFAULT '{}'::jsonb,
  reading_progress      JSONB NOT NULL DEFAULT '{}'::jsonb,
  newsletter_themes     TEXT[] NOT NULL DEFAULT '{}',
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Abilita RLS su tutte le tabelle
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feelings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bible_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bible_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bible_states ENABLE ROW LEVEL SECURITY;

-- ==================== ARTICOLI ====================
-- Tutti possono leggere articoli pubblicati
CREATE POLICY "Articoli pubblicati visibili a tutti"
  ON public.articles FOR SELECT
  USING (status = 'published');

-- Solo admin possono leggere bozze
CREATE POLICY "Admin possono leggere bozze"
  ON public.articles FOR SELECT
  USING (
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
    OR status = 'published'
  );

-- Solo admin possono inserire/modificare/eliminare articoli
CREATE POLICY "Admin possono creare articoli"
  ON public.articles FOR INSERT
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin possono modificare articoli"
  ON public.articles FOR UPDATE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin possono eliminare articoli"
  ON public.articles FOR DELETE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ==================== UTENTI ====================
-- Un utente può leggere/modificare solo il proprio profilo
CREATE POLICY "Utenti leggono proprio profilo"
  ON public.users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Utenti modificano proprio profilo"
  ON public.users FOR UPDATE
  USING (id = auth.uid());

-- Admin può leggere/modificare tutti gli utenti
CREATE POLICY "Admin leggono tutti gli utenti"
  ON public.users FOR SELECT
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin modificano tutti gli utenti"
  ON public.users FOR UPDATE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ==================== FEELINGS ====================
-- Tutti leggono, admin scrivono
CREATE POLICY "Feelings visibili a tutti"
  ON public.feelings FOR SELECT USING (true);

CREATE POLICY "Admin gestiscono feelings"
  ON public.feelings FOR INSERT
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin modificano feelings"
  ON public.feelings FOR UPDATE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin eliminano feelings"
  ON public.feelings FOR DELETE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ==================== VIDEO ====================
CREATE POLICY "Video visibili a tutti"
  ON public.videos FOR SELECT USING (true);

CREATE POLICY "Admin gestiscono video"
  ON public.videos FOR INSERT
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin modificano video"
  ON public.videos FOR UPDATE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin eliminano video"
  ON public.videos FOR DELETE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ==================== LEARNING PATHS ====================
CREATE POLICY "Percorsi visibili a tutti"
  ON public.learning_paths FOR SELECT USING (true);

CREATE POLICY "Admin gestiscono percorsi"
  ON public.learning_paths FOR INSERT
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin modificano percorsi"
  ON public.learning_paths FOR UPDATE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin eliminano percorsi"
  ON public.learning_paths FOR DELETE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ==================== NEWSLETTER ====================
-- Chiunque può iscriversi
CREATE POLICY "Iscrizione newsletter pubblica"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Admin possono leggere/gestire iscritti
CREATE POLICY "Admin leggono iscritti"
  ON public.newsletter_subscribers FOR SELECT
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin gestiscono iscritti"
  ON public.newsletter_subscribers FOR DELETE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ==================== BIBBIA ====================
-- Tutti possono leggere libri e versetti
CREATE POLICY "Libri biblici visibili a tutti"
  ON public.bible_books FOR SELECT USING (true);

CREATE POLICY "Admin gestiscono libri biblici"
  ON public.bible_books FOR INSERT
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin modificano libri biblici"
  ON public.bible_books FOR UPDATE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin eliminano libri biblici"
  ON public.bible_books FOR DELETE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Versetti
CREATE POLICY "Versetti visibili a tutti"
  ON public.bible_verses FOR SELECT USING (true);

CREATE POLICY "Admin gestiscono versetti"
  ON public.bible_verses FOR INSERT
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin modificano versetti"
  ON public.bible_verses FOR UPDATE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin eliminano versetti"
  ON public.bible_verses FOR DELETE
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ==================== USER BIBLE STATE ====================
-- Solo l'utente proprietario può leggere/modificare il proprio stato
CREATE POLICY "Utente legge proprio stato bibbia"
  ON public.user_bible_states FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Utente crea proprio stato bibbia"
  ON public.user_bible_states FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Utente modifica proprio stato bibbia"
  ON public.user_bible_states FOR UPDATE
  USING (user_id = auth.uid());

-- ============================================================
-- TRIGGER: aggiornamento updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER user_bible_states_updated_at
  BEFORE UPDATE ON public.user_bible_states
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- INDEX per performance
-- ============================================================
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_feelings_slug ON public.feelings(slug);
CREATE INDEX idx_videos_youtube_id ON public.videos(youtube_id);
CREATE INDEX idx_learning_paths_slug ON public.learning_paths(slug);
CREATE INDEX idx_bible_books_slug ON public.bible_books(slug);
CREATE INDEX idx_bible_verses_book_chapter ON public.bible_verses(book_id, chapter);
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_user_bible_states_user_id ON public.user_bible_states(user_id);