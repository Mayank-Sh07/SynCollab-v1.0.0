import React from "react";
import { supabase } from "../supabase";
import { definitions } from "@/types/supabase";
import { useRouter } from "next/router";
import { useUser } from "@/supabase/authentication";
import {
  createStyles,
  makeStyles,
  Theme,
  fade,
} from "@material-ui/core/styles";
import Link from "./Link";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import LoginIcon from "@material-ui/icons/AccountCircle";
import SignoutIcon from "@material-ui/icons/ExitToApp";
import ProfileIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(1),
      backgroundColor: fade(theme.palette.secondary.main, 0.125),
    },
  })
);

export default function UserAvatar() {
  const classes = useStyles();
  const router = useRouter();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let userProfile: definitions["profiles"] | undefined = undefined;
  if (typeof window !== "undefined") {
    //@ts-expect-error
    userProfile = JSON.parse(localStorage.getItem("userProfile"));
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const showProfile = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    router.push("/profile");
  };

  const signOut = async (event: React.MouseEvent<HTMLElement>) => {
    await supabase.auth.signOut();
    handleClose();
    router.push("/");
  };

  if (user === null || userProfile === undefined) {
    return (
      <>
        <Hidden smUp>
          <Link href="/auth/login">
            <IconButton className={classes.menuButton}>
              <LoginIcon />
            </IconButton>
          </Link>
        </Hidden>
        <Hidden xsDown>
          <Link href="/auth/login">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LoginIcon />}
            >
              LOGIN
            </Button>
          </Link>
        </Hidden>
      </>
    );
  }

  return (
    <>
      <Avatar
        alt={userProfile?.username}
        src={userProfile?.avatar_url}
        onClick={handleMenu}
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={showProfile}>
          <ListItemIcon>
            <ProfileIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <SignoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Signout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
