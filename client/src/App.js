import React, { Suspense } from "react";
import "./App.css";
import AuthView from "./views/auth-view/auth-view";
import ChatView from "./views/chat-view/chat-view";
import { Switch, Route } from "react-router-dom";
import ForgotPasswordView from "./views/forgot-password-view/forgot-password-view";
import ResetPasswordView from "./views/reset-password-view/reset-password-view";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import Spinner from "./components/spinner/spinner.component";

const App = () => (
  <div className="App">
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={AuthView} />
          <Route path="/chat" component={ChatView} />
          <Route path="/forgotPassword" component={ForgotPasswordView} />
          <Route path="/resetPassword/:token" component={ResetPasswordView} />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  </div>
);

export default App;
