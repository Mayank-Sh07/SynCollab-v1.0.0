import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { makeStyles, Theme, fade } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import { BoxProps } from "@material-ui/core/Box";

import CopyIcon from "@material-ui/icons/FileCopy";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    maxWidth: 275,
    minWidth: 240,
  },
  codeContainer: {
    fontSize: "0.565rem",
    color: "white",
    backgroundColor: fade(theme.palette.secondary.dark, 0.4),
    width: "100%",
    padding: "2px 8px",
    borderRadius: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

interface TeamCodeBoxProps {
  code?: string;
  boxProps?: BoxProps;
}

function TeamCodeBox(props: TeamCodeBoxProps) {
  const classes = useStyles();
  const { code, boxProps } = props;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Container disableGutters className={classes.container}>
      <Box {...boxProps} width="100%">
        {!!code ? (
          <CopyToClipboard text={code} onCopy={() => handleCopy()}>
            <div className={classes.codeContainer}>
              <span>{code}</span>
              {copied ? (
                <DoneAllIcon style={{ fontSize: 12, color: "green" }} />
              ) : (
                <CopyIcon style={{ fontSize: 12 }} />
              )}
            </div>
          </CopyToClipboard>
        ) : (
          <LinearProgress color="secondary" style={{ width: "inherit" }} />
        )}
      </Box>
    </Container>
  );
}

export default TeamCodeBox;
