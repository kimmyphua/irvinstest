import logo from "./logo.svg";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import ViewProducts from "./Components/ViewProducts";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <>
  <BrowserRouter>
  <Navigation/>
  <Switch>
    <Route path="/" exact>
      <ViewProducts/>
    </Route>
    <Route path="/products" exact>
    <AddProduct/>
    </Route>
  </Switch>
  </BrowserRouter>


   
    </>
  );
}

export default App;