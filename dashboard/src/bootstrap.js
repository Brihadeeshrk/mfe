import { createApp } from "vue";
import DashboardApp from "./components/Dashboard.vue";

// Mount fn to start the App up
/**
 * This code snippet defines a function called mount that renders the <App> component to a specified element, sets up a history object for navigation,
 * and returns a function to handle navigation events. If provided, it also listens for navigation events using the onNavigate callback.
 * @param {*} el
 * @param {onNavigate, onParentNavigate} callbackFns
 * @returns {onParentNavigate} - a function to handle navigation events from container -> subapp
 */
const mount = (el) => {
  const app = createApp(DashboardApp);
  app.mount(el);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) mount(devRoot);
}

// we are running through container
// and we should export the mount function
export { mount };
