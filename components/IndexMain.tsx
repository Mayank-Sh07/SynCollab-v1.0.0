import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@/components/Link";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    margin: theme.spacing(3, 0),
    backgroundImage: "url(https://source.unsplash.com/1600x1200/?sky,white)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: 340,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function MainFeaturedPost() {
  const classes = useStyles();
  const post = {
    title: "Welocme to SynCollab",
    description:
      "Inspire, align and improve collaboration amongst your team with SynCollabs easy to use OKR and Status platform",
    image: "https://source.unsplash.com/1600x1200/?sky,white",
    imgText: "Welcome to syncollab",
    linkText: "Continue to the SynCollab App",
  };

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${post.image})` }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: "none" }} src={post.image} alt={post.imgText} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              style={{ fontWeight: 700 }}
            >
              {post.title}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link href="/app">
              <Button variant="contained" color="secondary">
                {post.linkText}
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
