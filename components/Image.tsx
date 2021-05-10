import React from "react";
import NextImage, { ImageProps } from "next/image";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(2),
    },
  })
);

export default function Image(props: ImageProps): React.ReactElement {
  const classes = useStyles();
  return (
    <Container maxWidth={"md"} className={classes.center}>
      <NextImage {...props} />
    </Container>
  );
}
