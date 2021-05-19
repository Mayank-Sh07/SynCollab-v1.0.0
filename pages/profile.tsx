import React from "react";
import { useUser } from "@/supabase/authentication";
// import Profiler from "@/components/Profile";
import TeamCodeBox from "@/components/TeamCodeBox";

export default function Profile() {
  const { user } = useUser();
  return (
    <div>
      {/* <Profiler userName="mike" editable={true} /> */}
      <TeamCodeBox code="159fc216-9624-41e2-8cef-4cd936623064" />
    </div>
  );
}
