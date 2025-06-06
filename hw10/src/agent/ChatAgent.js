

const createChatAgent = () => {

    const CS571_WITAI_ACCESS_TOKEN = "TEQXARMCRT2LS3A4WELDNGY2FH35BLP7"; // Put your CLIENT access token here.

    let availableItems = [];
    let cart = {};

    const handleInitialize = async () => {
        const response = await fetch("https://cs571.org/rest/f24/hw10/items", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        })
        const data = await response.json();
        availableItems = data;
        data.forEach(element => {
            cart[element.name] = 0;
        });

        console.log(availableItems);
        console.log(cart);


        return "Welcome to BadgerMart Voice! Type your question, or ask for help if you're lost!";
    }

    const handleReceive = async (prompt) => {
        let res = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(prompt), {
            headers: {
                "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
            }
        })
        let data = await res.json();
        console.log(data);

        if (data.intents.length === 0) {
            return "Sorry, I didn't get that. Type 'help to see what you can do";
        } else {
            const intentName = data.intents[0].name;
            if (intentName === "ask_help") {
                return await askHelp()
            } else if (intentName === "get_items") {
                return await getItems()
            } else if (intentName === "ask_price") {
                // how to get the item in an object: using key value pair: entities is an object, using the key "type:type" to get the value
                // the value of "type:type" is an array, so we use [0] to get the first element
                // It's kind of confusing !!!
                return await getItemPrice(data.entities["type:type"][0]["value"])
            } else if (intentName === "add_item") {
                return await addItem(data);
            } else if (intentName === "remove_item") {
                return await removeItem(data);
            } else if (intentName === "view_cart") {
                return await viewCart();
            } else if (intentName === "checkout") {
                return await checkout();
            }
        }
    }

    async function askHelp() {
        return "In BadgerMart Voice, you can get the list of items, the price of an item, add or remove an item from you cart"
    }

    async function getItems() {
        return "We have " + availableItems.map(item => item.name).join(", ");
    }

    async function getItemPrice(itemName) {
        // filter function returns an array
        console.log(availableItems)
        const targetItem = availableItems.filter(item => item.name === itemName);
        console.log(targetItem)
        if (targetItem.length === 0) {
            return "Sorry, the item is not in stock";
        } else {
            return `${itemName} cost $${targetItem[0].price} each`;
        }
    }

    async function addItem(data) {
        const typeEntity = data.entities["type:type"];
        if (!typeEntity || typeEntity.length === 0) {
            return "Sorry, this item is not in stock";
        }
        const itemName = typeEntity[0]?.value;

        // if(data.entities["type:type"] === undefined){
        //     return "sorry, this item is not in stock"
        // } 
        // const itemName = data.entities["type:type"][0]["value"];

        const itemNumEntity = data.entities["wit$number:number"];
        const itemNum = itemNumEntity?.[0]?.value ?? 1; // 1 is the default value

        if (itemNum < 1) {
            return "Sorry, you need to add at least one item";
        }
        cart[itemName] += Math.floor(itemNum);

        // let itemNum = data.entities["wit$number:number"]
        // if(itemNum[0]["value"] < 1){
        //     return "Sorry, you need to add at least one item"
        // }
        // if(itemNum === undefined){
        //     return await addItem(itemName, 1);
        // } 
        console.log(cart);
        return `Sure, adding ${itemNum} ${itemName}(s) to your cart.`;

    }

    async function removeItem(data) {
        const typeEntity = data.entities["type:type"];
        if (!typeEntity || typeEntity.length === 0) {
            return "Sorry, this item is not in stock";
        }
        const itemName = typeEntity[0]?.value;
        const itemNumEntity = data.entities["wit$number:number"];
        const itemNum = itemNumEntity?.[0]?.value ?? 1; // 1 is the default value

        if (itemNum < 1) {
            return "Sorry, remove at least one item";
        }
        if (cart[itemName] === 0) {
            return "Sorry, you don't have this item in your cart"
        }
        cart[itemName] -= Math.floor(itemNum);
        console.log(cart);
        return `Sure, removing ${itemNum} ${itemName}(s) from your cart.`
    }

    async function viewCart() {
        let totalPrices = 0;
        let totalItems = '';
        let cartItems = [];
        for (let item in cart) {
            if (cart[item] > 0) {
                cartItems.push({ itemName: item, itemNum: cart[item] });
                totalPrices += cart[item] * availableItems.filter(i => i.name === item)[0].price;
            }
        }

        if (cartItems.length === 0) {
            return "Your cart is empty"
        } else {
            let i = 0;
            console.log(cartItems);
            while (i < cartItems.length) {
                if (i < cartItems.length - 2) {
                    totalItems += `${cartItems[i]['itemNum']} ${cartItems[i]['itemName']}、`;
                } else if (i === cartItems.length - 2) {
                    totalItems += `${cartItems[i]['itemNum']} ${cartItems[i]['itemName']} and `;
                } else {
                    totalItems += `${cartItems[i]['itemNum']} ${cartItems[i]['itemName']}`;
                }
                i++;
            }
        }
        return `You have ${totalItems} in your cart, totaling $${totalPrices.toFixed(2)}.`
    }

    async function checkout() {
        if (Object.keys(cart).every(item => cart[item] === 0)) {
            return "Your cart is empty. Please add some items first."
        }
        const res = await fetch('https://cs571.org/rest/f24/hw10/checkout', {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cart)
        })
        const data = await res.json();
        cart = {};
        return `Success! your confirmation ID number is ${data.confirmationId}.`
    }
    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;