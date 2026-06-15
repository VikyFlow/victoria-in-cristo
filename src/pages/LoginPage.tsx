import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export function LoginPage() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  if (user) return <Navigate to={user.role === "admin" ? "/admin" : "/area-utente"} replace />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const ok = await (mode === "login" ? login(email, password) : register(String(form.get("name")), email, password));
    if (!ok) {
      setError(mode === "login" ? "Credenziali non valide." : "Email gia registrata.");
      return;
    }
    navigate(user?.role === "admin" ? "/admin" : "/area-utente");
  }

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-4xl font-black text-white">{mode === "login" ? "Accedi" : "Crea account"}</h1>
        <p className="mt-3 text-sm leading-6 text-warm/65">Il sito resta pubblico. L'account serve solo per salvare preferiti, versetti e newsletter.</p>
        <div className="mt-6 grid grid-cols-2 rounded-full border border-white/10 p-1">
          <button onClick={() => setMode("login")} className={`rounded-full py-2 text-sm font-black ${mode === "login" ? "bg-gold text-deepblack" : "text-warm/60"}`}>Login</button>
          <button onClick={() => setMode("register")} className={`rounded-full py-2 text-sm font-black ${mode === "register" ? "bg-gold text-deepblack" : "text-warm/60"}`}>Register</button>
        </div>
        <form onSubmit={submit} className="mt-5 grid gap-4 rounded-lg border border-white/10 bg-white/[0.05] p-5">
          {mode === "register" ? <label className="grid gap-2 text-sm font-bold text-warm/80">Nome<input required name="name" className="rounded-lg border border-white/10 bg-deepblack px-4 py-3 text-white outline-none focus:border-gold" /></label> : null}
          <label className="grid gap-2 text-sm font-bold text-warm/80">Email<input required type="email" name="email" className="rounded-lg border border-white/10 bg-deepblack px-4 py-3 text-white outline-none focus:border-gold" /></label>
          <label className="grid gap-2 text-sm font-bold text-warm/80">Password<input required type="password" name="password" className="rounded-lg border border-white/10 bg-deepblack px-4 py-3 text-white outline-none focus:border-gold" /></label>
          <button className="rounded-full bg-gold px-5 py-3 text-sm font-black text-deepblack hover:bg-warm">{mode === "login" ? "Entra" : "Registrati"}</button>
          {error ? <p className="text-sm font-bold text-red-300">{error}</p> : null}
          <p className="text-xs leading-5 text-warm/45">Demo admin: admin@demo.it / admin123</p>
        </form>
      </div>
    </section>
  );
}
