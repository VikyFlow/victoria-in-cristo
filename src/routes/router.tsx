import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminDashboardPage } from "../admin/AdminDashboardPage";
import { BibleAdminPage } from "../admin/BibleAdminPage";
import { VideoSyncAdminPage } from "../admin/VideoSyncAdminPage";
import { ArticleEditorPage } from "../admin/ArticleEditorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicLayout } from "../layouts/PublicLayout";
import { ArticlePage } from "../pages/ArticlePage";
import { BibleBookPage } from "../pages/BibleBookPage";
import { BiblePage } from "../pages/BiblePage";
import { BiblePracticalPage } from "../pages/BiblePracticalPage";
import { BlogPage } from "../pages/BlogPage";
import { FaqPage } from "../pages/FaqPage";
import { FeelingPage } from "../pages/FeelingPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyStoryPage } from "../pages/MyStoryPage";
import { NewsletterPage } from "../pages/NewsletterPage";
import { StartHerePage } from "../pages/StartHerePage";
import { UserDashboardPage } from "../pages/UserDashboardPage";
import { VideoDetailPage } from "../pages/VideoDetailPage";
import { VideosPage } from "../pages/VideosPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/articoli", element: <Navigate to="/blog" replace /> },
      { path: "/articoli/:slug", element: <ArticlePage /> },
      { path: "/come-ti-senti/:slug", element: <FeelingPage /> },
      { path: "/bibbia", element: <BiblePage /> },
      { path: "/bibbia/:bookSlug", element: <BibleBookPage /> },
      { path: "/bibbia/:bookSlug/:chapterNumber", element: <BibleBookPage /> },
      { path: "/bibbia/:bookSlug/:chapterNumber/:verseNumber", element: <BibleBookPage /> },
      { path: "/bibbia-pratica", element: <BiblePracticalPage /> },
      { path: "/percorsi", element: <Navigate to="/" replace /> },
      { path: "/piani-lettura", element: <Navigate to="/bibbia" replace /> },
      { path: "/video", element: <VideosPage /> },
      { path: "/video/:id", element: <VideoDetailPage /> },
      { path: "/la-mia-storia", element: <MyStoryPage /> },
      { path: "/newsletter", element: <NewsletterPage /> },
      { path: "/faq", element: <FaqPage /> },
      { path: "/inizia-da-qui", element: <StartHerePage /> },
      { path: "/login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/area-utente", element: <UserDashboardPage /> },
        ],
      },
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          { path: "/admin", element: <AdminDashboardPage /> },
          { path: "/admin/articoli/:id", element: <ArticleEditorPage /> },
          { path: "/admin/bibbia", element: <BibleAdminPage /> },
          { path: "/admin/video-sync", element: <VideoSyncAdminPage /> },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
