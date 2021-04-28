import { useEffect, memo } from "react";
import { useRouter } from "next/router";
import { SupabaseClient } from "@supabase/supabase-js";
import useUser from "@/utils/useUser";

export interface Props {
  supabaseClient: SupabaseClient;
}

function ServerSideAuthListner(props: Props): any {
  const { supabaseClient } = props;
  const { mutate } = useUser();
  const router = useRouter();
  useEffect(() => {
    console.log("SS AUTH UseEffect");
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        // for client side user data integrity
        mutate();
        // for server side user data integrity
        fetch("/api/cookie", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
        if (event == "SIGNED_OUT") {
          router.push("/");
        }
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return <></>;
}

export default memo(ServerSideAuthListner);
