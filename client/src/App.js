import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from "./components/Navbaar";
import Home from "./components/Home";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import { Switch, Route } from "react-router-dom";
import User from "./components/User";
import Admins from "./components/Admins";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />
        <Route path="/admins" component={Admins} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/view/:id" component={Details} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </>
  );
}

export default App;
