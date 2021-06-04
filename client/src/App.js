import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import Components
import Index from './components/Index';
import Header from './components/Header';
import Courses from './components/Courses';


function App() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/courses" component={Courses} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
