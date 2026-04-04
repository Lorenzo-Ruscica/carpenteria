-- 1. Creazione della tabella dei servizi
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    desc_testo TEXT NOT NULL,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Abilitazione Row Level Security (RLS) per sicurezza
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Tutti su Internet possono LEGGERE i servizi (serve per farli vedere nel sito)
CREATE POLICY "Permetti a tutti di leggere i servizi" 
ON public.services FOR SELECT 
USING (true);

-- 4. Policy: Solo gli amministratori (Utenti autenticati) possono Creare, Modificare o Eliminare
CREATE POLICY "Permetti solo agli admin di modificare" 
ON public.services FOR ALL 
USING (auth.role() = 'authenticated');

-- 5. Configurazione Storage (Magazzino immagini)
-- ATTENZIONE: Se il bucket non esiste, devi prima andare su Storage -> New Bucket e chiamarlo "servizi_immagini" e impostarlo come "Public"
-- Dopodiché esegui le policy seguenti:

CREATE POLICY "Tutti possono scaricare le immagini"
ON storage.objects FOR SELECT
USING ( bucket_id = 'servizi_immagini' );

CREATE POLICY "Solo admin possono caricare/eliminare file"
ON storage.objects FOR ALL
USING ( bucket_id = 'servizi_immagini' AND auth.role() = 'authenticated' );
