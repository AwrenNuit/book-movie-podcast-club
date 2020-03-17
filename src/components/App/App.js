import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import About from '../About/About';
import Home from '../Home/Home';
import Books from '../Books/Books';
import Movies from '../Movies/Movies';
import Podcasts from '../Podcasts/Podcasts';
import Nav from '../Nav/Nav';

export default function App() {

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/podcasts" component={Podcasts} />
          <Redirect from="/*" to="/" />
        </Switch>
      </Router>
    </>
  );
}