import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from "./components/Navbaar";
import AdminHome from "./components/AdminHome";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import { Switch, Route } from "react-router-dom";
import User from "./components/User";
import Admins from "./components/Admins";
import LoginPage from "./components/LoginPage/LoginPage";
import Home from "./components/Pages/Home";
import Orders from "./components/Orders";
import Subscription from "./components/Subscription";
import LogIn from "./components/LoginPage/LogIn";

function App() {
  return (
    <>
      {/* <AdminHome/> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/AdminHome" component={AdminHome} />
        <Route path="/user" component={User} />
        <Route path="/admins" component={Admins} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/orders" component={Orders}/>
        <Route exact path="/subscription" component={Subscription}/>
        <Route path="/navbar" component={Navbaar} />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/view/:id" component={Details} />
        <Route exact path="/login" component={LoginPage} />
        {/* <Route exact path="*" component={Error}/> */}
        {/* <Route exact path="/PageLog" component={LogIn} /> DEMO */}
      </Switch>
    </>
  );
}

export default App;
