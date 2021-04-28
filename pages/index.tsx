import React from "react";
// import { useRouter } from "next/router";
import PageLayout from "@/layouts/PageLayout";
import Main from "@/components/IndexMain";
// import { supabase } from "@/supabase/index";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//       margin: theme.spacing(1),
//     },
//   })
// );

function Index() {
  // const classes = useStyles();
  // const router = useRouter();

  return (
    <div>
      <Main />
    </div>
  );
}

Index.layout = PageLayout;

export default Index;
