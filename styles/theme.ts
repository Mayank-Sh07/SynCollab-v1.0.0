import { red } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let SyncollabTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#25282c",
      main: "#1a232e ",
      dark: "#151719",
    },
    secondary: {
      main: "#5658dd",
    },
    background: {
      default: "#151719",
      paper: "#151719",
    },
    error: {
      main: red[400],
    },
    text: {
      secondary: "#9ca9b3",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
  breakpoints: {
    values: {
      xs: 340,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1440,
    },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      root: {
        borderRadius: 4,
      },
      label: {
        textTransform: "none",
        textOverflow: "ellipsis",
      },
    },
    MuiTabs: {
      root: {
        marginLeft: 8,
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: "#ffffff",
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
      },
    },
    MuiIconButton: {
      root: {
        padding: 8,
        color: "#ffffff",
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: 500,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
    MuiLink: {
      underlineHover: {
        textDecoration: "none",
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
  },
});

SyncollabTheme = responsiveFontSizes(SyncollabTheme);

export default SyncollabTheme;
