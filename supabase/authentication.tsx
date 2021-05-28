import { useEffect, useState, createContext, useContext } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";
import { definitions } from "@/types/supabase";

export interface AuthSession {
  user: User | null;
  session: Session | null;
}

const UserContext = createContext<AuthSession>({ user: null, session: null });

export interface Props {
  supabaseClient: SupabaseClient;
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const { supabaseClient } = props;
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabaseClient.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user !== null) {
          const { data: profiles } = await supabaseClient
            .from<definitions["profiles"]>("profiles")
            .select("*")
            .eq("uid", session?.user.id);
          const userProfile = profiles === null ? null : profiles[0];
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
        }
        fetch("/api/cookie", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
        if (event === "SIGNED_OUT") {
          localStorage.clear();
        } else if (event === "SIGNED_IN") {
          window.location.reload();
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = { session, user };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
