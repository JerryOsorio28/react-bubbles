import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import "./styles.scss";

//importing BubblesPage component
import BubblePage from './components/BubblePage'

//importing custom PrivateRoute component
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [colorList, setColorList] = useState([]);

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute 
          exact path ='/BubblePage' 
          component={BubblePage}
        />
      </div>
    </Router>
  );
}

export default App;
