import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { users as mockUsers } from "../data/mockData";
import type { User } from "../types/content";
import { readStorage, writeStorage } from "../services/storage";

interface AuthContextValue {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (user: User) => void;
}

const usersKey = "nsqpc_users";
const sessionKey = "nsqpc_session";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => readStorage<User[]>(usersKey, mockUsers));
  const [user, setUser] = useState<User | null>(() => {
    const sessionId = readStorage<string | null>(sessionKey, null);
    return readStorage<User[]>(usersKey, mockUsers).find((item) => item.id === sessionId) ?? null;
  });

  const value = useMemo<AuthContextValue>(() => ({
    user,
    users,
    login(email, password) {
      const found = users.find((item) => item.email === email && item.password === password);
      if (!found) return false;
      setUser(found);
      writeStorage(sessionKey, found.id);
      return true;
    },
    register(name, email, password) {
      if (users.some((item) => item.email === email)) return false;
      const created: User = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        role: "user",
        favoriteArticleIds: [],
        favoriteVerseIds: [],
        favoriteVideoIds: [],
        startedPathIds: [],
        newsletter: false,
      };
      const next = [created, ...users];
      setUsers(next);
      writeStorage(usersKey, next);
      setUser(created);
      writeStorage(sessionKey, created.id);
      return true;
    },
    logout() {
      setUser(null);
      writeStorage(sessionKey, null);
    },
    updateUser(nextUser) {
      const next = users.map((item) => (item.id === nextUser.id ? nextUser : item));
      setUsers(next);
      writeStorage(usersKey, next);
      setUser(nextUser);
    },
  }), [user, users]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
