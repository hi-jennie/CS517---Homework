// This is where your JS goes!

// You can fetch data from https://cs571.org/rest/f24/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571.org/rest/f24/ice/pasta
//  https://cs571.org/rest/f24/ice/pizza




function updateRecipe(){
    const chosenRecipe = document.getElementById("recipe-selector").value;
    fetch(`https://cs571.org/rest/f24/ice/${chosenRecipe}`, {
        headers: {
            "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
        }
    }).then(res => {
        console.log(res.status);
        // convert the response from JSON to a JS object
        return res.json();
    }).then(data => {
        console.log(data)

        // example!!!
        // const previewTag = document.getElementById("preview");
        // const name = document.createElement('h2');
        // const author = document.createElement('p');
        // name.innerText = data.name.split("-")[1];
        // author.innerText = data.author;
        // previewTag.appendChild(name);
        // previewTag.appendChild(author);
    
        const recipeElem = document.getElementById("recipe-name");
        recipeElem.innerText = data.name;
    
        const authorElem = document.getElementById("recipe-author");
        authorElem.innerText = "by " + data.author;
    
        const imgElem = document.getElementsByTagName("img")[0];
        imgElem.src = data.img.location;
        imgElem.alt = data.img.description;
    
        // set the instructions
        const instructionsElem = document.getElementById("instructions"); 
        for(let i = 0; i < data.recipe.length; i++){
            const listElem = document.createElement("li");
            listElem.innerText = data.recipe[i];
            instructionsElem.appendChild(listElem);
        }
    
        // set the ingredients
        const ingredientsElem = document.getElementById("ingredients-body");
        // think about why we should clear the inner HTML before adding new one
        // if not doing so, all the line be appended at the end of the table
        ingredientsElem.innerHTML = "";
        const ingredients = data.ingredients;
        console.log(ingredients);
        for(const key in ingredients){
            const rowElem = document.createElement("tr");
            const ingredientObj = ingredients[`${key}`];
    
            const amountTd = document.createElement("td");
            const unitTd = document.createElement("td");
            const itemTd = document.createElement("td");
    
            amountTd.innerText = ingredientObj["amount"];
    
            
            if(Object.keys(ingredientObj).includes("unit")){       
                unitTd.innerText = ingredientObj["unit"];
                
            }else{
                unitTd.innerText = "";
                rowElem.appendChild(unitTd);
            }
    
            if(Object.keys(ingredientObj).includes("misc")){       
                itemTd.innerText = key+`(${ingredientObj["misc"]})`;   
            }else{
                itemTd.innerText = key;
                
            }
    
            rowElem.appendChild(amountTd);
            rowElem.appendChild(unitTd);
            rowElem.appendChild(itemTd);
            ingredientsElem.appendChild(rowElem);
    
        }
    });
}

updateRecipe();



/*
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

*/

