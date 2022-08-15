import { Fragment } from "react";
import Navbar from "./components/Navbar.js";
import Commits from "./components/Commits.js";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Commits />
    </Fragment>
  );
}

export default App;
