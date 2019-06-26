import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "../Layouts";
import { AboutView, HomeView, NotFound } from "../views";

import "./style.scss";

import HelloWorld from "../modules/HelloWorld";

export default function App(): JSX.Element {
  return (
    <div id="App">
      <Layout>
        <Switch>
          <Route exact={true} path="/" component={HomeView} />
          <Route exact={true} path="/about" component={AboutView} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}
