import { Menu, Search, User } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { BrandLogo } from "../components/BrandLogo";

const links = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/bibbia", label: "Bibbia" },
  { to: "/video", label: "Video" },
  { to: "/la-mia-storia", label: "La mia storia" },
  { to: "/faq", label: "FAQ" },
];

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen text-warm">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-deepblack/82 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <BrandLogo />
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-white/10 text-gold" : "text-warm/70 hover:text-white"}`}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/bibbia" aria-label="Cerca nella Bibbia" className="rounded-full border border-white/10 p-2 text-warm/70 hover:text-gold"><Search size={18} /></Link>
            {user ? (
              <>
                <Link to={user.role === "admin" ? "/admin" : "/area-utente"} aria-label="Area personale" className="rounded-full border border-white/10 p-2 text-warm/70 hover:text-gold"><User size={18} /></Link>
                <button onClick={logout} className="hidden rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-warm/70 hover:text-white sm:inline-flex">Logout</button>
              </>
            ) : (
              <Link to="/login" className="rounded-full bg-white px-4 py-2 text-sm font-black text-deepblack">Login</Link>
            )}
            <button onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/10 p-2 text-warm/70 lg:hidden" aria-label="Menu"><Menu size={20} /></button>
          </div>
        </nav>
        {open ? (
          <div className="border-t border-white/10 px-4 py-3 lg:hidden">
            <div className="grid gap-2">
              {links.map((link) => <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold text-warm/75 hover:bg-white/10" key={link.to} to={link.to}>{link.label}</Link>)}
              <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold text-warm/75 hover:bg-white/10" to="/inizia-da-qui">Inizia da qui</Link>
              <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold text-warm/75 hover:bg-white/10" to="/newsletter">Newsletter</Link>
            </div>
          </div>
        ) : null}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-white/10 px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
          <div>
            <BrandLogo />
            <p className="mt-2 text-sm leading-6 text-warm/60">Fede, Bibbia e domande vere in un linguaggio semplice e profondo.</p>
          </div>
          <Link className="text-sm font-bold text-warm/70 hover:text-gold" to="/inizia-da-qui">Inizia da qui</Link>
          <Link className="text-sm font-bold text-warm/70 hover:text-gold" to="/newsletter">Newsletter</Link>
        </div>
      </footer>
    </div>
  );
}
