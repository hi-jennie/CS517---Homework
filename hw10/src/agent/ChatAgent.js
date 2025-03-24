

const createChatAgent = () => {

    const CS571_WITAI_ACCESS_TOKEN = "TEQXARMCRT2LS3A4WELDNGY2FH35BLP7"; // Put your CLIENT access token here.

    let availableItems = [];

    const handleInitialize = async () => {
        const response = await fetch("https://cs571.org/rest/f24/hw10/items", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        })
        const data = await response.json();
        availableItems = data;
        console.log(availableItems);
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
    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;