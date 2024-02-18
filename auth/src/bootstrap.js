import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

// Mount fn to start the App up
/**
 * This code snippet defines a function called mount that renders the <App> component to a specified element, sets up a history object for navigation,
 * and returns a function to handle navigation events. If provided, it also listens for navigation events using the onNavigate callback.
 * @param {*} el
 * @param {onNavigate, onParentNavigate} callbackFns
 * @returns {onParentNavigate} - a function to handle navigation events from container -> subapp
 */
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  // to run browserHistory in isolation and memoryHistory when running in production
  const history =
    defaultHistory ||
    createMemoryHistory({
      // adding this initialEntries and initialPath because it assumed that the initialPath was / which is we had to click on the Signup button twice
      // once for the memoryBrowserHistory and once for the to change from / -> /auth/signup and the other for it to change from /auth/signup -> /auth/signup where it rendered the component
      // this way we're passing the initialPath to the mount fn and changing the component as soon as we click on the button
      initialEntries: [initialPath],
    });

  // whenever there is a change in history, this callback will be called
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  /**
   * Handles navigation when the parent component's pathname changes.
   *
   * @param {object} nextPathname - the next pathname to navigate to
   */
  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// we are running through container
// and we should export the mount function
export { mount };
