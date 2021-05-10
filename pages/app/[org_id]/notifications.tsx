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

function Notifications() {
  return <div>Notifications</div>;
}

Notifications.layout = AppLayout;

export default Notifications;
