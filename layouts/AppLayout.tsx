import React from "react";
import { useUser } from "@/supabase/authentication";
import { OrgLocalStorage, LayoutProps } from "@/types/local";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ToolBar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "@/components/Navigator";
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
      [theme.breakpoints.up("lg")]: {
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
      padding: theme.spacing(5, 2),
      background: theme.palette.primary.dark,
    },
  })
);

function AppLayout(props: LayoutProps) {
  const classes = useStyles();
  const { children } = props;
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let orgData: OrgLocalStorage | null = null;
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
        <Hidden lgUp implementation="js">
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
        <Hidden mdDown implementation="css">
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
        <ToolBar />
        <main className={classes.main}>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
