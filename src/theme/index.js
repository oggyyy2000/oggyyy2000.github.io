import { colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F4F6F8",
      paper: colors.common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#5664d2",
    },
    success: {
      contrastText: "#ffffff",
      main: "#4caf50",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
  },
  shadows,
  typography,
});

export default theme;
