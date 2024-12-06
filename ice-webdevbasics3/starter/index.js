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

    console.log("!the main ingredients are...!");
    data.recipe.map(rec => {
        return rec.split(":")[0];       
    }).forEach(ingre => console.log(ingre));

    console.log("!the ingredients are...!");
    Object.keys(data.ingredients).map(keyName => {
        console.log(data.ingredients[keyName].amount + keyName);
    })
})
// .catch(err => {
//     alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
// })