import React from "react";
import MarketingApp from "./components/MarketingApp";

const App = () => {
  console.log("Triggering invalidation");
  return <MarketingApp />;
};

export default App;
