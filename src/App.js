import "./App.css";
import React from "react";
import Geocode from "react-geocode";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./asset/css/GlobalStyles";
import theme from "./theme";
import routes from "./routes";
import WSContextProvider from "./component/main/contexts/WSContext";
import WeatherContextProvider from "./component/main/contexts/WeatherContext";
import AuthenContextProvider from "./component/main/contexts/AuthenContext";
import DataContextProvider from "./component/contexts/DataContext";

// import * as actions from "./actions/index"
Geocode.setApiKey("AIzaSyDC8AsBAx1cDfV2mNKLiICA0GfnPv9HLDE");

//const url = "http://localhost:8000"

function App() {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <AuthenContextProvider>
        <DataContextProvider>
          <WSContextProvider>
            <WeatherContextProvider>
              <GlobalStyles />
              {routing}
            </WeatherContextProvider>
          </WSContextProvider>
        </DataContextProvider>
      </AuthenContextProvider>
    </ThemeProvider>
  );
}

export default App;
