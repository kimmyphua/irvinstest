import logo from "./logo.svg";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ViewProducts from "./Components/ViewProducts";
import Navigation from "./Components/Navigation";
import Info from "./Components/Info";

function App() {
  return (
    <div class="app">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <ViewProducts />
          </Route>
          <Route path="/products" exact>
            <AddProduct />
          </Route>
          <Route path="/info" exact>
            <Info />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
