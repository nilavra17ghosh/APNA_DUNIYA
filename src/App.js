import React from "react";
import "./App.scss";
import "./components/animation/Animation.scss";
import Main from "./containers/Main";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

function App() {
  useIntersectionObserver();

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
