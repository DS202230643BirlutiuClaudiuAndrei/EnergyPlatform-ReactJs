import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavigationBar from "./navigation-bar";
import Home from "./home/home";
import PersonContainer from "./person/UserManagemet";
import LoginPage from "./login/LoginPage";

import ErrorPage from "./commons/errorhandling/error-page";
import styles from "./commons/styles/project-style.css";
import ProtectedRoute from "./commons/protectedRoute/ProtectedRoute.js";
/*
    Namings: https://reactjs.org/docs/jsx-in-depth.html#html-tags-vs.-react-components
    Should I use hooks?: https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both
*/
function App() {
  return (
    <div className={styles.back}>
      <Router>
        <div>
          <NavigationBar />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )}
            />

            <Route
              exact
              path="/person"
              render={() => (
                <ProtectedRoute role="ADMIN">
                  {" "}
                  <PersonContainer />
                </ProtectedRoute>
              )}
            />

            <Route exact path="/login" render={() => <LoginPage />} />

            {/*Error*/}
            <Route exact path="/error" render={() => <ErrorPage />} />

            <Route render={() => <ErrorPage />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
