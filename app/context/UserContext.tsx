import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getProfile } from '../lib/auth';
import { User } from '../models/User';

type UserData = {
  id: string;
  email: string;
  name: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  refreshUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromSession = async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Erro ao obter sessão:', sessionError.message);
        setLoading(false);
        return;
      }

      const sessionUser = session?.user;

      if (sessionUser) {
        const { id, email, user_metadata } = sessionUser;

        setUser({
          id,
          email: email ?? '',
          name: user_metadata?.name ?? '', // pegando o name direto do metadata
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Erro inesperado ao carregar usuário:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserFromSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserFromSession();
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const refreshUser = async () => {
    await loadUserFromSession();
  };

  return (
    <UserContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

