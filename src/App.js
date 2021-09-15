import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import RecipesContainer from "./components/RecipesContainer"
import GroceriesContainer from "./components/GroceriesContainer"
import Home from "./components/Home"

function App() {
  const [markets, setMarkets] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:9292/recipes")
      .then((resp) => resp.json())
      .then((recipes) => setRecipes(recipes));
  }, []);
  
  function updateRecipeList(updatedCheckedRecipe) {
    setRecipes(recipes.map((ogRecipe) => ogRecipe.id === updatedCheckedRecipe.id ? {...ogRecipe, recipe_chosen: true} : ogRecipe))
  }

  useEffect(() => {
    fetch("http://localhost:9292/markets")
      .then((resp) => resp.json())
      .then((markets) => setMarkets(markets));
  }, []);


  useEffect(() => {
    fetch("http://localhost:9292/ingredients")
      .then((resp) => resp.json())
      .then((ingredients) => setIngredients(ingredients));
  }, []);



  return (
    <Router>
    <div className="App">
      <nav className="nav">
        <h2><Link to="/">Home</Link></h2>
        <h2><Link to="/recipes">Recipes</Link></h2>
        <h2><Link to="/groceries">Grocery List</Link></h2>    
      </nav>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/recipes">
            <RecipesContainer recipes={recipes} updateRecipeList={updateRecipeList}/>
        </Route>
        <Route path="/groceries">
            <GroceriesContainer />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
