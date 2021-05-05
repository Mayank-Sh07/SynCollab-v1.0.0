import React from "react";
import PageLayout from "@/layouts/PageLayout";
import Link from "@/components/Link";
import { supabase } from "@/supabase/index";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//       margin: theme.spacing(1),
//     },
//   })
// );

function Index() {
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

  return (
    <div>
      <Link href="/auth/login">Login</Link>
      <br />
      <Link href="/auth/signup">SignUp</Link>
      <br />
      <Link href="/app">App</Link>
      <br />
      <button
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        SIGNOUT
      </button>
    </div>
  );
}

Index.layout = PageLayout;

export default Index;
