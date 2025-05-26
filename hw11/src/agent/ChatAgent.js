import createChatDelegator from "./ChatDelegator";
import { isLoggedIn, getLoggedInUsername, ofRandom } from "./Util";

const createChatAgent = () => {
    const CS571_WITAI_ACCESS_TOKEN = "EQYVVIESGF7XYHKEG6YHTD5B3QT5AMVT"; // Put your CLIENT access token here.

    const delegator = createChatDelegator();

    let chatrooms = [];

    const handleInitialize = async () => {
        const resp = await fetch("https://cs571.org/rest/f24/hw11/chatrooms", {
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        });
        const data = await resp.json();
        chatrooms = data;

        return "Welcome to BadgerChat! My name is Bucki, how can I help you?";
    }

    const handleReceive = async (prompt) => {
        if (delegator.hasDelegate()) { return delegator.handleDelegation(prompt); }
        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0) {
            switch (data.intents[0].name) {
                case "get_help": return handleGetHelp();
                case "get_chatrooms": return handleGetChatrooms();
                case "get_messages": return handleGetMessages(data);
                case "login": return handleLogin();
                case "register": return handleRegister();
                case "create_message": return handleCreateMessage(data);
                case "logout": return handleLogout();
                case "whoami": return handleWhoAmI();
            }
        }
        return "Sorry, I didn't get that. Type 'help' to see what you can do!";
    }

    const handleGetHelp = async () => {
        return ofRandom(["Try asking 'give me a list of chatrooms', or ask for more help!",
            "Try asking 'register for an account', or ask for more help"
        ]);
    }

    const handleGetChatrooms = async () => {
        return `of course, there are ${chatrooms.length} rooms: ${chatrooms.join(",")}`
    }

    const handleGetMessages = async (data) => {
        const hasSpecifiedNumber = data.entities['wit$number:number'] ? true : false
        const messageNum = hasSpecifiedNumber ? data.entities['wit$number:number'][0]['value'] : 1
        const hasSpecifiedRoom = data.entities['chat_room:chat_room'] ? true : false
        const chatRoom = hasSpecifiedRoom ? data.entities["chat_room:chat_room"][0]['value'] : "Bascom Hill Hangout";
        // I don't know how to get the latest messages from all chatrooms, so I assign a default chatRoom.
        const resp = await fetch(`https://cs571.org/rest/f24/hw11/messages?chatroom=${chatRoom}&num=${messageNum}`, {
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        })
        const messagesData = await resp.json()
        console.log(messagesData)
        // console.log(`messagesData: ${messagesData.messages}`)
        return messagesData.messages.map(message => {
            return `In ${chatRoom}, ${message.poster} created a post titled ${message.title} saying ${message.content}`
        });


    }

    const handleLogin = async () => {
        return await delegator.beginDelegation("LOGIN");
    }

    const handleRegister = async () => {
        return await delegator.beginDelegation("REGISTER");
    }

    const handleCreateMessage = async (data) => {
        return await delegator.beginDelegation("CREATE");
    }

    const handleLogout = async () => {
        return "I should try to log out..."
    }

    const handleWhoAmI = async () => {
        const username = await getLoggedInUsername();
        if (username) {
            return `you are currently logged in as ${username}`;
        } else {
            return "You are not logged in, Please login first"
        }

    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;