// This is where your JS goes!

// You can fetch data from https://cs571.org/rest/f24/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571.org/rest/f24/ice/pasta
//  https://cs571.org/rest/f24/ice/pizza

let reviewNum = 0;

const BASE_AMNS = [1, 15, 14.5, 2, 1, 1, 1]
const REVIEWS = [
    "A burst of warmth and flavor in every spoonful; simple yet irresistible!",
    "The perfect blend of spice and comfort, an easy go-to chili recipe.",
    "Loved the hearty texture and rich taste - a new family favorite!",
    "Quick, flavorful, and satisfying - this chili hits all the right notes!"
]


// TODO Implement the update yield!
function updateYield() {
    console.log(1);
    const selectValue = parseInt(document.getElementById("serving-selector").value);
    const tableBody = document.getElementById("ingredients-body");
    const rows = tableBody.getElementsByClassName("important-ingredient");
    // teacher's solution
    for (let i = 0; i <rows.length; i++) {
        const priceTd = rows[i].getElementsByTagName("td")[0];
        priceTd.innerText = (BASE_AMNS[i] * selectValue).toString();
    }

    // let i = 0;
    // for (const row of rows) {
    //     const priceTd = row.getElementsByTagName("td")[0];
    //     priceTd.innerText = BASE_AMNS[i] * selectValue;
    //     i++;
    // }

    alert("I should update the yield!");
}

// TODO Fix the reviews!
function displayReview() {
    alert(REVIEWS[reviewNum]);
    reviewNum = (reviewNum + 1) % REVIEWS.length;
}