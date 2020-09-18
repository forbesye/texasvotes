import React from 'react';
import Navbar from "components/Navbar.js"
import {Switch, Route} from "react-router-dom";
import Splash from "components/Splash.js"
import About from "components/About.js"

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/about" component={About} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
