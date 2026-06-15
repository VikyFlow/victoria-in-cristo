import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "../types/content";
import { supabaseService } from "../services/supabaseService";

interface AuthContextValue {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Ripristina sessione al mount
  useEffect(() => {
    supabaseService.getSession().then(setUser);
    supabaseService.getAllUsers().then(setUsers);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    users,
    async login(email, password) {
      const loggedIn = await supabaseService.login(email, password);
      if (!loggedIn) return false;
      setUser(loggedIn);
      const all = await supabaseService.getAllUsers();
      setUsers(all);
      return true;
    },
    async register(name, email, password) {
      const created = await supabaseService.register(name, email, password);
      if (!created) return false;
      setUser(created);
      const all = await supabaseService.getAllUsers();
      setUsers(all);
      return true;
    },
    async logout() {
      await supabaseService.logout();
      setUser(null);
    },
    async updateUser(nextUser) {
      const updated = await supabaseService.updateUser(nextUser);
      setUser(updated);
      const all = await supabaseService.getAllUsers();
      setUsers(all);
    },
  }), [user, users]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
