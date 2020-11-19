import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignUpContainer from "./Modal/Login/SignUpContainer";
import SignInContainer from './Modal/Login/SignInContainer'
import {ProtectedRoute} from "./service/Authentication/protectedRoute";
import NewPassword from "./Component/Login/NewPassword";
import {About} from './Modal/About/aboutBookora';
import {NewBooking} from "./Modal/Booking/newBooking";
import {MyBooking} from "./Modal/Booking/myBooking";
import {ZoneSettings} from "./Component/AdminPages/ZoneSettings";
import ContainerForgotPassword from "./Modal/Login/ContainerForgotpassword";
import resendConfirm from "./Component/Login/resendActivation";
import ChartContainer from "./Modal/Statistics/ChartContainer";
import Archive from "./Component/AdminPages/Statistics";
import {NotFoundPage} from "./Modal/NotFoundPage";
import {CreateNewAdmin} from "./Component/AdminPages/CreateNewAdmin";
import {NavigationBar} from "./Component/Layout/NavigationBar";


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
            <>
              <div className="container">
              <ProtectedRoute component={NavigationBar} />

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
            </>
            <Route path="*" component={NotFoundPage} />
            
          </Switch>

        </BrowserRouter>

      </div >
    );
  }
}
export default App;
