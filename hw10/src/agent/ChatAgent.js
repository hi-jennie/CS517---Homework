

const createChatAgent = () => {

    const CS571_WITAI_ACCESS_TOKEN = ""; // Put your CLIENT access token here.

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
        // TODO: Replace this with your code to handle a user's message!
        return "Your message has been received. Maybe I should contact Wit.AI to figure out what you intend..."
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;