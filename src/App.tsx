import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Todo from './Todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import './App.css';
import Login from './Login';


function App() {

  // firebase.auth().onAuthStateChanged(user => {
  //   user ? history.push("/dashboard") : history.push("/login");
  //   renderApp();
  // });
  return (
    <Router>
      <div>
        {/* <Container className="container"> */}
        <Route path="/" exact component={Login} />
        <Route path="/todo" component={Todo} />
        <Route path="/todo-form" component={TodoForm} />
        <Route path="/todo-list" component={TodoList} />
        {/* </Container> */}
      </div>
    </Router>
  );
}

export default App;
