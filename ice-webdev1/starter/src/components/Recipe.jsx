import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Recipe({recipe}) {
    const [likes, setLikes] = useState(0);

    function handleClick(){
        // callback function is a better way to update the state
        setLikes(prevLikes => prevLikes + 1);
        setLikes(prevLikes => prevLikes + 1);
    }

    return <Card style={{marginTop: "0.5rem", maxWidth : "20rem",  margin:"auto"}}>
        <img src={recipe.img.location} />
        <h3>{recipe.name}</h3>
        <p>by {recipe.author}</p>
        {/* <p>{recipe.keywords.reduce((prev, curr) => prev + curr +" ", " ")}</p> */}
        <p>{recipe.keywords.join(",")}</p>
        <p>{likes} likes</p>
        <Button onClick={handleClick}>I Like this recipe</Button>
    </Card>
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

// destructuring the props
// export default function Recipe({name, author, img,  keywords}) {
//     return <div >
//         <p>I am a recipe!</p>
//         <img src={img.location} style={{width: "100%",height: "auto" }}/>
//         <h3>{name}</h3>
//         <p>by {author}</p>
//         {/* <p>{keywords.reduce((prev, curr) => prev + curr +" ", " ")}</p> */}
//         <p>{keywords.join(",")}</p>
//     </div>
// }
