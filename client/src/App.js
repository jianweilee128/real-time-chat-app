import React from "react";
import "./App.css";
import AuthView from "./views/auth-view/auth-view";
import ChatView from "./views/chat-view/chat-view";
import { Switch, Route } from "react-router-dom";

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={AuthView} />
      <Route path="/chat" component={ChatView} />
    </Switch>
  </div>
);

export default App;
