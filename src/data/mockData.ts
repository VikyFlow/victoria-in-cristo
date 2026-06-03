import { channelVideos } from "./channelVideos";
import type { Article, Feeling, LearningPath, User, Verse } from "../types/content";

export const categories = [
  "Identita",
  "Scopo della vita",
  "Ansia e pace",
  "Relazioni",
  "Fede pratica",
  "Preghiera",
  "Bibbia spiegata",
  "Testimonianze",
];

export const tags = ["Gesu", "pace", "identita", "Gen Z", "speranza", "Bibbia", "preghiera", "scopo"];

export const articles: Article[] = [
  {
    id: "a1",
    title: "Perche esisto davvero?",
    slug: "perche-esisto-davvero",
    seoDescription: "Una guida semplice e profonda per chi cerca il motivo della propria esistenza alla luce della Bibbia.",
    category: "Scopo della vita",
    tags: ["scopo", "identita", "Gesu"],
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    content:
      "<p>La domanda sul perche esistiamo non e un pensiero astratto: e una fame del cuore. La Bibbia non risponde con una formula fredda, ma con una relazione.</p><h2>Creato per relazione</h2><p>Sei stato creato per conoscere Dio, amare le persone e vivere con una direzione che supera la performance.</p><p>Gesu mostra che il centro della vita non e dimostrare valore, ma ricevere amore e poi viverlo.</p>",
    keyVerse: "Efesini 2:10 - Siamo infatti opera sua, creati in Cristo Gesu per le buone opere.",
    practicalApplication: "Scrivi tre cose che ti fanno sentire vivo e chiediti come potrebbero diventare servizio, non solo ambizione.",
    prayer: "Dio, aiutami a vedere la mia vita con i tuoi occhi. Dammi direzione, pace e coraggio.",
    status: "published",
    publishedAt: "2026-05-12",
    readingTime: "5 min",
  },
  {
    id: "a2",
    title: "Come trovare pace quando l'ansia sale",
    slug: "come-trovare-pace-quando-ansia-sale",
    seoDescription: "Versetti e passi pratici per affrontare ansia, paura e pensieri pesanti con fede e lucidita.",
    category: "Ansia e pace",
    tags: ["pace", "preghiera", "speranza"],
    coverImage: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80",
    content:
      "<p>L'ansia non ti rende meno spirituale. Spesso e un segnale che il corpo e la mente chiedono cura, verita e respiro.</p><h2>Porta tutto davanti a Dio</h2><p>La preghiera non e negare il problema: e smettere di portarlo da soli.</p>",
    keyVerse: "Filippesi 4:6-7 - In ogni cosa fate conoscere le vostre richieste a Dio.",
    practicalApplication: "Fai tre respiri lenti, nomina la paura, poi trasforma la frase in una preghiera concreta.",
    prayer: "Signore, entra nei miei pensieri agitati. Insegnami una pace piu forte del controllo.",
    status: "published",
    publishedAt: "2026-05-20",
    readingTime: "4 min",
  },
  {
    id: "a3",
    title: "Dio mi ama anche quando mi sento sbagliato?",
    slug: "dio-mi-ama-anche-quando-mi-sento-sbagliato",
    seoDescription: "Un articolo per chi si sente in colpa, lontano o indegno dell'amore di Dio.",
    category: "Identita",
    tags: ["Gesu", "identita", "speranza"],
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    content:
      "<p>La colpa dice: sei definito dal tuo errore. Il Vangelo dice: puoi essere definito dall'amore di Cristo.</p><h2>Grazia non e scusa</h2><p>La grazia non banalizza il male: apre una strada per essere perdonati e trasformati.</p>",
    keyVerse: "Romani 5:8 - Dio mostra il suo amore per noi in questo: mentre eravamo ancora peccatori, Cristo e morto per noi.",
    practicalApplication: "Confessa a Dio una cosa che stai nascondendo e ricevi il suo perdono senza aggiungere autopunizione.",
    prayer: "Gesu, aiutami a smettere di scappare. Portami dentro una grazia che cambia davvero.",
    status: "published",
    publishedAt: "2026-05-26",
    readingTime: "6 min",
  },
  {
    id: "a4",
    title: "Come leggere la Bibbia senza sentirsi persi",
    slug: "come-leggere-la-bibbia-senza-sentirsi-persi",
    seoDescription: "Una guida mobile-first e pratica per iniziare a leggere la Bibbia con chiarezza.",
    category: "Bibbia spiegata",
    tags: ["Bibbia", "Gen Z", "fede"],
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
    content:
      "<p>Non devi capire tutto subito. Inizia dai Vangeli, guarda Gesu e fai domande oneste al testo.</p><h2>Tre domande utili</h2><p>Cosa dice di Dio? Cosa dice dell'uomo? Cosa posso vivere oggi?</p>",
    keyVerse: "Salmo 119:105 - La tua parola e una lampada al mio piede e una luce sul mio sentiero.",
    practicalApplication: "Leggi Marco 1 e scrivi una frase su Gesu che ti colpisce.",
    prayer: "Dio, apri la mia mente e il mio cuore mentre leggo. Fammi incontrare te, non solo informazioni.",
    status: "published",
    publishedAt: "2026-05-29",
    readingTime: "5 min",
  },
  {
    id: "a5",
    title: "Pregare quando non sai cosa dire",
    slug: "pregare-quando-non-sai-cosa-dire",
    seoDescription: "Come pregare in modo semplice, vero e sostenibile, anche quando ti senti vuoto.",
    category: "Preghiera",
    tags: ["preghiera", "pace", "Dio"],
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    content:
      "<p>Pregare non richiede parole perfette. A volte la preghiera piu vera e una frase fragile detta con sincerita.</p><h2>Inizia piccolo</h2><p>Parla a Dio come parleresti a qualcuno che ti conosce profondamente e non si scandalizza.</p>",
    keyVerse: "Matteo 6:9 - Padre nostro che sei nei cieli, sia santificato il tuo nome.",
    practicalApplication: "Imposta cinque minuti senza notifiche e di a Dio tre frasi: grazie, aiutami, guidami.",
    prayer: "Padre, insegnami a pregare con verita. Rendimi presente a te.",
    status: "draft",
    publishedAt: "2026-06-05",
    readingTime: "4 min",
  },
];

export const verses: Verse[] = [
  { id: "v1", topic: "ansia", reference: "Filippesi 4:6-7", text: "Non angustiatevi di nulla, ma in ogni cosa fate conoscere le vostre richieste a Dio.", explanation: "Dio invita a portare l'ansia in preghiera.", context: "Paolo scrive a una comunita sotto pressione.", application: "Trasforma una preoccupazione in una richiesta specifica." },
  { id: "v2", topic: "paura", reference: "Isaia 41:10", text: "Non temere, perche io sono con te.", explanation: "La presenza di Dio e piu forte della minaccia.", context: "Parole di consolazione a un popolo fragile.", application: "Ripeti il versetto prima di affrontare una situazione difficile." },
  { id: "v3", topic: "amore", reference: "1 Giovanni 4:10", text: "In questo e l'amore: non che noi abbiamo amato Dio, ma che egli ha amato noi.", explanation: "L'amore parte da Dio, non dalla nostra performance.", context: "Giovanni spiega il cuore del Vangelo.", application: "Ricevi amore prima di cercare di meritarlo." },
  { id: "v4", topic: "perdono", reference: "1 Giovanni 1:9", text: "Se confessiamo i nostri peccati, egli e fedele e giusto da perdonarci.", explanation: "La confessione apre spazio alla guarigione.", context: "Una lettera sulla comunione con Dio.", application: "Confessa senza recitare una parte." },
  { id: "v5", topic: "identita", reference: "2 Corinzi 5:17", text: "Se uno e in Cristo, egli e una nuova creatura.", explanation: "In Cristo non sei incastrato nella vecchia storia.", context: "Paolo parla della riconciliazione.", application: "Scrivi una vecchia etichetta e sostituiscila con una verita biblica." },
  { id: "v6", topic: "pace", reference: "Giovanni 14:27", text: "Vi lascio pace; vi do la mia pace.", explanation: "La pace di Gesu non dipende da circostanze perfette.", context: "Gesu parla ai discepoli prima della croce.", application: "Chiedi pace prima di cercare controllo." },
  { id: "v7", topic: "forza", reference: "Salmo 46:1", text: "Dio e per noi un rifugio e una forza.", explanation: "La forza biblica nasce dal rifugio in Dio.", context: "Un salmo di fiducia nel caos.", application: "Fermati e nomina Dio come rifugio." },
  { id: "v8", topic: "speranza", reference: "Romani 15:13", text: "Il Dio della speranza vi riempia di ogni gioia e pace.", explanation: "La speranza e un dono che Dio alimenta.", context: "Paolo benedice la chiesa di Roma.", application: "Chiedi speranza come dono, non come sforzo." },
  { id: "v9", topic: "fede", reference: "Ebrei 11:1", text: "La fede e certezza di cose che si sperano.", explanation: "La fede e fiducia orientata verso Dio.", context: "Un capitolo sui testimoni della fede.", application: "Fai oggi un passo coerente con cio che credi." },
  { id: "v10", topic: "guarigione", reference: "Salmo 147:3", text: "Egli guarisce chi ha il cuore spezzato.", explanation: "Dio vede le ferite interiori.", context: "Un salmo sulla cura di Dio.", application: "Porta a Dio una ferita senza minimizzarla." },
];

export const feelings: Feeling[] = [
  { id: "f1", label: "Mi sento perso", slug: "mi-sento-perso", summary: "Quando non sai da dove ripartire.", verses: ["v2", "v7"], explanation: "Sentirsi persi non significa essere abbandonati. La fede comincia spesso con una domanda onesta.", prayer: "Dio, guidami un passo alla volta.", action: "Scrivi una decisione piccola ma concreta per oggi.", recommendedArticleIds: ["a1", "a4"], recommendedVideoIds: ["y1"] },
  { id: "f2", label: "Ho ansia", slug: "ho-ansia", summary: "Per pensieri che corrono troppo.", verses: ["v1", "v6"], explanation: "Dio non ti umilia per l'ansia: ti invita a consegnarla.", prayer: "Gesu, dammi la tua pace.", action: "Fai una lista di tre preoccupazioni e pregaci sopra.", recommendedArticleIds: ["a2"], recommendedVideoIds: ["y2"] },
  { id: "f3", label: "Mi sento solo", slug: "mi-sento-solo", summary: "Per quando ti manca presenza vera.", verses: ["v2", "v3"], explanation: "La solitudine puo diventare il luogo in cui riscopri una presenza piu profonda.", prayer: "Padre, fammi sentire visto.", action: "Manda un messaggio sincero a una persona fidata.", recommendedArticleIds: ["a3"], recommendedVideoIds: ["y3"] },
  { id: "f4", label: "Mi sento in colpa", slug: "mi-sento-in-colpa", summary: "Per uscire dalla vergogna.", verses: ["v4", "v5"], explanation: "La colpa puo indicare cio che va portato alla luce, non cio che deve distruggerti.", prayer: "Gesu, perdonami e cambiami.", action: "Confessa a Dio cio che stai evitando.", recommendedArticleIds: ["a3"], recommendedVideoIds: ["y4"] },
  { id: "f5", label: "Cerco uno scopo", slug: "cerco-uno-scopo", summary: "Per rimettere a fuoco la direzione.", verses: ["v5", "v8"], explanation: "Lo scopo cristiano nasce dall'essere amati e mandati.", prayer: "Dio, mostrami per cosa mi hai creato.", action: "Scegli un modo per servire qualcuno oggi.", recommendedArticleIds: ["a1"], recommendedVideoIds: ["y1"] },
  { id: "f6", label: "Ho bisogno di pace", slug: "ho-bisogno-di-pace", summary: "Quando dentro e tutto rumoroso.", verses: ["v1", "v6"], explanation: "La pace di Dio non sempre cambia subito fuori, ma inizia a cambiare dentro.", prayer: "Spirito Santo, rallenta il mio cuore.", action: "Spegni lo schermo per dieci minuti e respira pregando.", recommendedArticleIds: ["a2", "a5"], recommendedVideoIds: ["y2"] },
  { id: "f7", label: "Voglio ricominciare", slug: "voglio-ricominciare", summary: "Per una nuova partenza.", verses: ["v4", "v5"], explanation: "Con Dio ricominciare non e fingere che nulla sia successo: e camminare nella grazia.", prayer: "Signore, dammi un nuovo inizio.", action: "Fai una scelta concreta che protegga il nuovo cammino.", recommendedArticleIds: ["a3"], recommendedVideoIds: ["y5"] },
  { id: "f8", label: "Voglio conoscere Dio", slug: "voglio-conoscere-dio", summary: "Per iniziare senza maschere.", verses: ["v3", "v9"], explanation: "Conoscere Dio comincia guardando Gesu e ascoltando la sua Parola.", prayer: "Dio, se ci sei, fatti conoscere.", action: "Leggi Marco 1 e annota cosa noti di Gesu.", recommendedArticleIds: ["a4", "a5"], recommendedVideoIds: ["y6"] },
];

export const paths: LearningPath[] = [
  { id: "p1", title: "Inizia da qui", slug: "inizia-da-qui", description: "Una rotta essenziale per chi si avvicina alla fede.", coverImage: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1200&q=80", lessons: [{ id: "l1", title: "Perche cercare Dio", duration: "8 min" }, { id: "l2", title: "Il Vangelo in semplice", duration: "10 min" }] },
  { id: "p2", title: "Chi e Gesu?", slug: "chi-e-gesu", description: "Scopri Gesu oltre stereotipi e religione pesante.", coverImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80", lessons: [{ id: "l3", title: "Gesu storico", duration: "9 min" }, { id: "l4", title: "Gesu Salvatore", duration: "11 min" }] },
  { id: "p3", title: "Perche esisto?", slug: "perche-esisto", description: "Identita, vocazione e vita quotidiana.", coverImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80", lessons: [{ id: "l5", title: "Creati per relazione", duration: "7 min" }] },
  { id: "p4", title: "Come leggere la Bibbia", slug: "come-leggere-la-bibbia", description: "Un metodo semplice per iniziare e restare costante.", coverImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=80", lessons: [{ id: "l6", title: "Da dove iniziare", duration: "6 min" }] },
  { id: "p5", title: "Come pregare", slug: "come-pregare", description: "Una pratica sincera, quotidiana e sostenibile.", coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", lessons: [{ id: "l7", title: "Parlare con Dio", duration: "5 min" }] },
];

export const videos = channelVideos;

export const users: User[] = [
  { id: "u1", name: "Luca Demo", email: "utente@demo.it", password: "password123", role: "user", favoriteArticleIds: ["a1"], favoriteVerseIds: ["v6"], startedPathIds: ["p1"], newsletter: true },
  { id: "admin1", name: "Admin Demo", email: "admin@demo.it", password: "admin123", role: "admin", favoriteArticleIds: [], favoriteVerseIds: [], startedPathIds: [], newsletter: false },
];
