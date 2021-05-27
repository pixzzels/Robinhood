import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import StockDetail from "./components/StockDetail/index";
import NavBar from "./components/NavBar";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  let component;

  if (user != null) {
    component = (
      <NavBar />
    )
  } else {
    component = (
      <>
      </>
    )
  }


  return (
    <BrowserRouter>
      {component}
        <Switch>
          <Route path="/" exact={true}>
            <SplashPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/stocks/:ticker" exact={true} >
            <StockDetail />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard" exact={true} >
            <Dashboard />
          </ProtectedRoute>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
