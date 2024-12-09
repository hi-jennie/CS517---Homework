import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Recipe({recipe}) {
    return <div >
        <p>I am a recipe!</p>
        <img src={recipe.img.location} style={{width: "100%",height: "auto" }}/>
        <h3>{recipe.name}</h3>
        <p>by {recipe.author}</p>
        {/* <p>{recipe.keywords.reduce((prev, curr) => prev + curr +" ", " ")}</p> */}
        <p>{recipe.keywords.join(",")}</p>
    </div>
}

Recipe.propTypes = {
    recipe: PropTypes.shape({
        img: PropTypes.shape({
            location: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        keywords: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};


