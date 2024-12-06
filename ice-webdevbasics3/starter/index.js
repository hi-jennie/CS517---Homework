// This is where your JS goes!

fetch('https://cs571.org/rest/f24/ice/chili', {
    headers: {
        "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75" // You may hardcode your Badger ID instead.
    }
})
.then(res => {
    console.log(res.status, res.statusText);
    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
})
.then(data => {
    console.log(data);

    console.log("!the 5-star ratings are...!")
    data.reviews.filter(rev => rev.rating === 5).map(rev => rev.txt).forEach(txt => {
        console.log(txt);
    });

    // some and every 
    console.log(data.reviews.some(rev => rev.rating === 5)); // true 
    console.log(data.reviews.every(rev => rev.rating === 5)); // false

    // reduce (average rating)
    const ratingList = data.reviews.map(rev => rev.rating);
    const averageRating = (ratingList.reduce((prev,curr) => prev + curr, 0))/ratingList.length;
    console.log(averageRating);

    console.log("!the main ingredients are...!");
    data.recipe.map(rec => {
        return rec.split(":")[0];       
    }).forEach(ingre => console.log(ingre));

    console.log("!the ingredients are...!");
    Object.keys(data.ingredients).map(keyName => {
        console.log(data.ingredients[keyName].amount + keyName);
    })

    // reduce():remove duplicate unit
    // curr is the key of data.ingredients
    const uniUnits = Object.keys(data.ingredients).reduce((acc,curr)=>{
        const currIngreObj = data.ingredients[curr];
        if(currIngreObj.unit && !acc.includes(currIngreObj.unit)){
            acc.push(currIngreObj.unit);
        }
        // return value is essential
        return acc;
    },[]) // [] is the initial value of acc;
    console.log(uniUnits);
})
// .catch(err => {
//     alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
// })



// reduce function example

const numList = [1,2,34,5,7,8];
// taking in 2 parameters, the first is a callback function;
// the second is the staring value;
const total = numList.reduce((prev, cur) => prev + cur, 1.2)
console.log(total);
// actually here : prev + cur is the return value
// the return value will be assign to prev of the next round;