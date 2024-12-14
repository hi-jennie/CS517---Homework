/* eslint-disable react/prop-types */
const Student = (props) => {
    const fromWis = props.fromWisconsin ? "from Wisconsin" : "NOT from Wisconsin";
    const interestNum = props.interests.length > 1 ? `${props.interests.length} interests` : `${props.interests.length} interest`;
    const interestItem = props.interests.map((interest) => {
        return <li key={interest}>{interest}</li>
    })

    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <strong>{props.major}</strong>
        <p>{props.name.first} is taking {props.numCredits} credits and is {fromWis}</p>
        <br />
        <p>They have {interestNum} including...</p>
        <ul>
            {interestItem}
        </ul>
    </div>
}



export default Student;