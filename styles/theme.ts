import { teal, red } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#121212",
    },
    secondary: {
      main: teal[700],
    },
    background: {
      default: "#fff",
    },
    error: {
      main: red[400],
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
});

theme = responsiveFontSizes(theme);

export default theme;
