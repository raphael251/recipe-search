import React from 'react';
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY ;

class Recipe extends React.Component {
    state = {
        activeRecipe: []
    }

    componentDidMount = async () => {
        const RECIPE_ID = this.props.match.params.id;

        const getRecipe = await fetch(`https://www.food2fork.com/api/get?key=${API_KEY}&rId=${RECIPE_ID}`);
        const result = await getRecipe.json();

        this.setState({ activeRecipe: result.recipe });
    }

    render() {
        const recipe = this.state.activeRecipe;
        return (
            <div className="container">
                { this.state.activeRecipe.length !== 0 &&
                    <div className="active-recipe">
                        <img
                            className="active-recipe__image"
                            src={recipe.image_url}
                            alt={recipe.title} />
                        <h3 className="active-recipe__title">{ recipe.title }</h3>
                        <h4 className="active-recipe__publisher">
                            Publisher: <span>{ recipe.publisher }</span>
                        </h4>
                        <p className="active-recipe__website">Website: 
                            <span><a href={ recipe.publisher_url }>{ recipe.publisher_url }</a></span>
                        </p>
                        <button className="active-recipe__button">
                            <Link to="/">Go Home</Link>
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default Recipe;