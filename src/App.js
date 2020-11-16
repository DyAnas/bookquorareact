import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignUpContainer from "./Container/SignUpContainer";
import SignInContainer from './Container/SignInContainer'
import { ProtectedRoute } from "./Authentication/protectedRoute";
import NewPassword from "./Copmonent/Login/NewPassword";
import { About } from './Container/aboutBookora';
import { NewBooking } from "./Container/newBooking";
import { MyBooking } from "./Container/myBooking";
import { ZoneSettings } from "./Copmonent/AdminPages/ZoneSettings";
import ContainerForgotPassword from "./Container/ContainerForgotpassword";
import resendConfirm from "./Copmonent/Login/resendActivation";
import ChartContainer from "./Container/ChartContainer";
import Archive from "./Copmonent/AdminPages/Statistics";
import { NotFoundPage } from "../src/Container/NotFoundPage";
import { CreateNewAdmin } from "./Copmonent/AdminPages/CreateNewAdmin";
import { NavBar } from "../src/Container/Navbar";
import {NavigationBar} from "./Copmonent/NavigationBar";

class App extends Component {

  render() {
    return (
      <div className=" contianer">
     
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SignInContainer} />
            <Route path="/signup" component={SignUpContainer} />
            <Route path="/resend-activation" component={resendConfirm} />
            <Route path="/forgotPassword" component={ContainerForgotPassword} />
            <ProtectedRoute path="/NewPassword" component={NewPassword} />           

              <div className="container">
              <ProtectedRoute>
                <NavigationBar />

              </ProtectedRoute>
                <ProtectedRoute
                    path="/newBooking"
                    component={NewBooking} />

                <ProtectedRoute
                    path="/myBookings"
                    component={MyBooking} />
                <ProtectedRoute
                    path="/addNewAdmin"
                    component={CreateNewAdmin} />
                <ProtectedRoute
                    path="/aboutBookora"
                    component={About} />
                <ProtectedRoute
                    path="/zonesettings"
                    component={ZoneSettings} />
                <ProtectedRoute
                    path="/statistics"
                    component={ChartContainer} />
                <ProtectedRoute
                    path="/archive"
                    component={Archive} />
              </div>

            <Route path="*" component={NotFoundPage} />
            
          </Switch>

        </BrowserRouter>

      </div >
    );
  }
}
export default App;
