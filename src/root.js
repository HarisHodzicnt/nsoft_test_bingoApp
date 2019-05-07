import React from 'react';
import App from './App';
import LayoutBalls from './layoutBalls';
import SocketInfo from './socketInfo';
import GameRound from './gameRoundGame';
import { BrowserRouter as Router, Route } from "react-router-dom";
const Root=()=>(
<Router>
  <div>
<Route exact path="/" component={App}></Route>
<Route path="/layoutBalls" component={LayoutBalls}></Route>
<Route path="/socketInfo" component={SocketInfo}></Route>
<Route path="/gameRoundGame" component={GameRound}></Route>

  </div>
</Router>
);


export default Root;
