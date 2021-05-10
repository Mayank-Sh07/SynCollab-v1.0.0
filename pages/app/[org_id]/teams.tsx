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

function Teams() {
  return (
    <div>
      <h3>ALL TEAMS PAGE</h3>
      <ul>
        <li>Show All Organization Teams</li>
        <li>Request To Join On click</li>
        <li>Show Your teams with actions</li>
      </ul>
    </div>
  );
}

Teams.layout = AppLayout;

export default Teams;
