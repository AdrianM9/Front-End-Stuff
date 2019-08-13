import React from "react";
import { BrowserRouter as ReactRouter, Route, Switch } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import Homepage from "./Homepage";
import DualButton from "./DualButton/index";

function RouterWrapper() {
  return <Router />;
}

function Router() {
  return (
    <ReactRouter>
      <Switch>
        <Route exact path={ROUTES.HOMEPAGE} component={Homepage} />
        <Route path={ROUTES.DUAL_BUTTON} component={DualButton} />
      </Switch>
    </ReactRouter>
  );
}

export default RouterWrapper;
