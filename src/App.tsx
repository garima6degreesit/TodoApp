import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Login from './Login';


function App() {

  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/todo-form" component={TodoForm} />
      <Route path="/todo-list" component={TodoList} />
    </Router>
  );
}

export default App;
