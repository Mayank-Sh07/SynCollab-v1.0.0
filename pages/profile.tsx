import React from "react";
import { useUser } from "@/supabase/authentication";
// import Profiler from "@/components/Profile";

export default function Profile() {
  const { user } = useUser();
  return <div>{/* <Profiler userName="mike" editable={true} /> */}</div>;
}
