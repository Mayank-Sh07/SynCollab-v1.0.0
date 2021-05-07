import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@/components/Link";

export default function Copyright(): React.ReactElement {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {"Copyright © "}
      <Link color="textPrimary" href="/">
        SynCollab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
