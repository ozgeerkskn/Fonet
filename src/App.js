import "./App.css";

import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./Theme/DarkTheme";

import { CssBaseline } from "@mui/material";

import CustomerRoute from "./Routers/CustomerRoute";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";
import { findCart } from "./component/State/Cart/Action";
import Routers from "./Routers/Routers";
import { getRealEstateById } from "./component/State/RealEstate/Action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
  }, [auth.jwt]);

  useEffect(() => {
    dispatch(getRealEstateById(auth.jwt || jwt));
  }, [auth.user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
