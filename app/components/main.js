import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Projects from './projects';
import Organization from './organization';
import Profile from './profile';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/projects' component={Projects}/>
      <Route path='/organization' component={Organization}/>
      <Route path='/profile' component={Profile}/>
    </Switch>
  </main>
)

export default Main
