import React from 'react';

const Form = props => (
    <form onSubmit={props.getRecipe} style={{ marginBottom: "2rem" }}>
        <input type="text" name="recipeName" className="form__input" />
        <button className="form__button">Search</button>
    </form>
);

export default Form;