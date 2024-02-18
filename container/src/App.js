import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Progress from "./components/Progress";

// using lazy loading to load components asynchronously and only the req scripts
const lazyMarketing = lazy(() => import("./components/MarketingApp"));
const LazyAuth = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route>
                <LazyAuth onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={lazyMarketing} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default App;
