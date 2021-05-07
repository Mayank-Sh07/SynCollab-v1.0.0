import React from "react";
import dynamic from "next/dynamic";
import Link from "@/components/Link";
import { supabase } from "@/supabase/index";
const AppLayout = dynamic(() => import("@/layouts/AppLayout"), {
  ssr: false,
});

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//       margin: theme.spacing(1),
//     },
//   })
// );

function About() {
  // React.useEffect(() => {
  //   async function getData() {
  //     let { data: userNames, error } = await supabase
  //       .from("profiles")
  //       .select("username");

  //     console.log(
  //       "userNames: ",
  //       userNames?.map((row) => row.username)
  //     );
  //     if (error) return error;
  //     else return userNames;
  //   }

  //   const data = getData();
  //   console.log(data);
  // }, []);

  return <div>ABOUT ORG</div>;
}

About.layout = AppLayout;

export default About;
