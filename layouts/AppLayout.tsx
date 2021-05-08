import React from "react";
import { useUser } from "@/supabase/authentication";
import { Org } from "@/types/local";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "@/components/Navigator";
import Copyright from "@/components/Copyrights";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

const drawerWidth = 256;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    app: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    main: {
      flex: 1,
      padding: theme.spacing(6, 4),
      background: "#eaeff1",
    },
    footer: {
      padding: theme.spacing(2),
      background: "#eaeff1",
    },
  })
);

function AppLayout() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useUser();
  let orgData: Org | null = null;
  if (typeof window !== "undefined") {
    //@ts-expect-error
    orgData = JSON.parse(localStorage.getItem("orgData"));
  }
  if (orgData === null || user === null) {
    return <Loader isLocal={false} />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            orgId={orgData.orgId}
            orgName={orgData.orgName}
            user={user}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            orgId={orgData.orgId}
            orgName={orgData.orgName}
            user={user}
          />
        </Hidden>
      </nav>
      <div className={classes.app}>
        <Header
          user={user}
          orgId={orgData.orgId}
          orgName={orgData.orgName}
          onDrawerToggle={handleDrawerToggle}
        />
        <main className={classes.main}>{<h3>HELLO WORLD</h3>}</main>
        <footer className={classes.footer}>
          <Copyright />
        </footer>
      </div>
    </div>
  );
}

export default AppLayout;
