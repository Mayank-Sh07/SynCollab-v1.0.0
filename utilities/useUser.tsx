import useSWR from "swr";
import { supabase } from "@/supabase/index";
import { User } from "@supabase/supabase-js";
import { definitions } from "@/types/supabase";

interface UserData {
  profileData: definitions["profiles"];
  userData: User;
}

const userFetcher = async (): Promise<UserData | undefined> => {
  const session = supabase.auth.session();
  if (session === null) {
    return undefined;
  }
  const res = await fetch("/api/user", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ userId: session.user.id }),
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  const { data } = await res.json();
  return { profileData: data[0], userData: session.user };
};

export default function useUser() {
  const { data, error, mutate } = useSWR("use_user", userFetcher);
  const loading = !data && !error;
  return {
    userData: data?.userData,
    profileData: data?.profileData,
    loading,
    mutate,
  };
}
