import React from "react";
import { Switch, Route } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import Lista from "./views/dividas";
import FormDivida from "./views/dividas/formDivida";

function Routes() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Lista} />
        <Route path="/divida/" component={FormDivida} />
      </Switch>
    </Router>
  );
}

export default Routes;
