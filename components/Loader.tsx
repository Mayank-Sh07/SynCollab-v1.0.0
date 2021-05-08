import React from "react";
import { LoaderProps } from "@/types/local";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    localLoader: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    pageLoader: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

function Loader(props: LoaderProps) {
  const classes = useStyles();
  const { isLocal } = props;

  return (
    <Container
      maxWidth={false}
      disableGutters
      className={isLocal ? classes.localLoader : classes.pageLoader}
    >
      <CircularProgress />
    </Container>
  );
}

export default Loader;
