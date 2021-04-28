import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import PageLayout from "@/layouts/PageLayout";
import { supabase } from "@/supabase/index";
import { User } from "@supabase/supabase-js";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface Props {
  user: User;
}

function AppIndex(props: Props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Signout
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => {
          router.push("/app");
        }}
      >
        App
      </Button>
    </div>
  );
}

AppIndex.layout = PageLayout;

export default AppIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  if (!user) {
    return {
      props: {},
      redirect: { destination: "/auth/login", permanent: false },
    };
  }

  return { props: { user } };
};
