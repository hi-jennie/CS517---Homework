// import features from '../../../ice-webdev1/starter/node_modules/espree/lib/features'
import Nutrition from './Nutrition.jsx'
import { useState } from 'react'
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap'



export default function FeaturedItem({name, img, description, price, nutrition}) {
    const [showNutrition, setShowNutrition] = useState(false);

    const handleClick = () => {
        setShowNutrition(!showNutrition);
    }
    return <Card>
        <img src={img} alt='display feature image here'/>
        <h3>{name}</h3>
        <strong>${price} per unit</strong>
        <p style={{ textAlign: "justify" }}>{description}</p>
        {showNutrition ? <Nutrition nutrition={nutrition}/> : null}
        <Button onClick={handleClick}>Hide Nutrition Facts</Button>
    </Card>
}

FeaturedItem.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    nutrition: PropTypes.object.isRequired
};


