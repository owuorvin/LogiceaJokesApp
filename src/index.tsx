import CssBaseline from "@mui/material/CssBaseline";
import {  ThemeProvider } from "@mui/material/styles";
// import "fontsource-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import theme from "./css/theme";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./store/configureStore";
const queryClient = new QueryClient();
const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline />
            <App />
          </PersistGate>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
