import React from "react";
import AppLayout from "@/layouts/AppLayout";

// import dynamic from "next/dynamic";
// import Link from "@/components/Link";
// import { supabase } from "@/supabase/index";
// const AppLayout = dynamic(() => import("@/layouts/AppLayout"), {
//   ssr: false,
// });

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//       margin: theme.spacing(1),
//     },
//   })
// );

function Settings() {
  return (
    <div>
      <h3>ORG SETTINGS PAGE</h3>
      <ul>
        <li>Only visible to admins</li>
        <li>Show Org settings</li>
        <li>Creating new teams and sending notifs</li>
      </ul>
    </div>
  );
}

Settings.layout = AppLayout;

export default Settings;
