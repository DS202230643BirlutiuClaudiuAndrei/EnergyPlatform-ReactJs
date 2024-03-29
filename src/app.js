import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavigationBar from "./navigation-bar";
import Home from "./home/home";
import PersonContainer from "./user_management/UserManagemet";
import LoginPage from "./login/LoginPage";

import ErrorPage from "./commons/errorhandling/error-page";
import styles from "./commons/styles/project-style.css";
import ProtectedRoute from "./commons/protectedRoute/ProtectedRoute.js";
import MeterDeviceContainer from "./device_management/MeterDeviceContainer";
import ClientDevicesContainer from "./clientui/containers/ClientDevicesContainer";
import EnergyFooter from "./footer";
import ChatPage from "./chat/ChatPage";
import CommonChat from "./chat/CommonChat";
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
          <EnergyFooter />
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
            <Route
              exact
              path="/metering-devices"
              render={() => (
                <ProtectedRoute role="ADMIN">
                  {" "}
                  <MeterDeviceContainer />
                </ProtectedRoute>
              )}
            />
            <Route
              exact
              path="/owned-devices"
              render={() => (
                <ProtectedRoute role="CLIENT">
                  {" "}
                  <ClientDevicesContainer />
                </ProtectedRoute>
              )}
            />

            <Route exact path="/login" render={() => <LoginPage />} />
            <Route exact path="/chat" render={() => <ChatPage />} />
            <Route exact path="/common-chat" render={() => <CommonChat />} />

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
