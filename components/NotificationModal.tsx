import React from "react";
import useSWR from "swr";
import { getNotificationData, dateFormatRegex } from "@/utils/functions";
import Notification from "./Notification";
import Image from "./Image";
import BoxTypography from "./BoxTypography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import NotificationIcon from "@material-ui/icons/Notifications";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuPaper: {
      maxHeight: 600,
      width: 400,
      padding: "4px",
      backgroundColor: "#262C31",
      scrollbarWidth: "none", // Firefox
      "&::-webkit-scrollbar": {
        display: "none", // Safari + Chrome
      },
    },
    flexCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    icon: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.only("xs")]: {
        marginRight: theme.spacing(1),
      },
    },
  })
);

export default function NotificationModal(props: any) {
  const classes = useStyles();
  let userId = props.userId;

  const { data: Notifications, mutate } = useSWR(userId, getNotificationData);
  const NotificationCount: number = !Notifications?.data
    ? 0
    : Notifications.data.length;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (NotificationCount !== 0) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip
        title={!NotificationCount ? "No Notifications" : "Show Notifications"}
      >
        <IconButton onClick={handleClick} className={classes.icon}>
          <Badge badgeContent={NotificationCount} color="secondary">
            <NotificationIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      {!!Notifications && !!Notifications.data && (
        <Menu
          id="notifications-menu"
          variant="menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            className: classes.menuPaper,
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          getContentAnchorEl={null}
        >
          {Notifications.fetchError ? (
            <div className={classes.flexCenter}>
              <Image src="/nodata.svg" height={140} width={240} />
              <BoxTypography
                color="secondary"
                fontWeight={500}
                mb={2}
                variant="body2"
              >
                Couldn't get Notifications
              </BoxTypography>
              <IconButton onClick={() => mutate()}>
                <RefreshIcon />
              </IconButton>
            </div>
          ) : (
            Notifications.data.map((item) => (
              <div key={item.nid}>
                <Notification
                  key={item.nid}
                  nid={item.nid}
                  type={item.type}
                  date={dateFormatRegex(String(item.date_created).slice(0, 10))}
                  fullname={item.profiles.full_name}
                  username={item.profiles.username}
                  avatarURL={item.profiles.avatar_url}
                  body={item.body}
                  senderId={item.sender_id}
                />
              </div>
            ))
          )}
        </Menu>
      )}
    </div>
  );
}
