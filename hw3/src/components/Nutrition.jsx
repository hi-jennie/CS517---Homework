import {Table} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function FeaturedItem({nutrition}) {
    console.log(nutrition);

    const nutritionFacts = Object.keys(nutrition).map((key)=>{
        return <td key={key}>{key}</td>;
    })

    const nutritionValues = Object.values(nutrition).map((value)=>{
        return <td key={value}>{value}</td>;
    })

    return <>
        <strong>Nutrition Facts</strong>
        <Table>
           <thead>
                <tr>
                    {nutritionFacts}
                </tr>               
           </thead>
           <tbody>
                <tr>{nutritionValues}</tr>
           </tbody>
        </Table>
    </>
}

FeaturedItem.propTypes = {
    nutrition: PropTypes.object.isRequired
}