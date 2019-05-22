import React from 'react';

import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  state = {
    recipes: []
  }
  componentDidMount = () => {
    const jsonData = localStorage.getItem('recipes');
    const recipesJson = JSON.parse(jsonData);
    
    recipesJson ? this.setState({ recipes: recipesJson }) : this.setState({ recipes: [] });
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&page=1 `);
    const data = await api_call.json();
    
    this.setState({
      recipes: data.recipes
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
