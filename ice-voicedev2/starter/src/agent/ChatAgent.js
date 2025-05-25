import createChatDelegator from "./ChatDelegator";
import { isLoggedIn, logout, ofRandom } from "./Util";

const createChatAgent = () => {
    const CS571_WITAI_ACCESS_TOKEN = "ICP4MJRTVQ6NS6GTY7UF2M2TA33OEHEY"; // Put your CLIENT access token here.

    const delegator = createChatDelegator();
    // let stage;
    // let username;
    // let password;

    const handleInitialize = async () => {
        return "Welcome to BadgerChat Mini! My name is Bucki, how can I help you?";
    }

    const handleReceive = async (prompt) => {
        // 这几步是决定 prompt 的处理权是由我们自己控制还是由wit.ai 控制
        // if (stage === "FOLLOWUP_USERNAME") {
        //     username = prompt;
        //     stage = "FOLLOWUP_PASSWORD";
        //     return "Please enter your password.";
        // } else if (stage === "FOLLOWUP_PASSWORD") {
        //     password = prompt;
        //     stage = undefined;
        //     const res = await fetch("https://cs571.org/rest/f24/ice/login", {
        //         method: "POST",
        //         credentials: "include",
        //         headers: {
        //             "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             username,
        //             password
        //         })
        //     })
        //     if (res.status === 200) {
        //         return "Login successful!";
        //     } else {
        //         return "check your credentials and try again.";
        //     }
        // }
        if (delegator.hasDelegate()) { return delegator.handleDelegation(prompt); }
        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0) {
            switch (data.intents[0].name) {
                case "create_comments": return handleCreateComment(data);
                case "get_comments": return handleGetComments(data);
                case "login": return handleLogin(data);
                case "logout": return handleLogout(data);
            }
        }
        return "Sorry, I didn't get that.";
    }

    const handleGetComments = async (promptData) => {
        const hasSpecifiedNumber = promptData.entities["wit$number:number"] ? true : false;
        const numComments = hasSpecifiedNumber ? promptData.entities["wit$number:number"][0].value : 1;
        const resp = await fetch(`https://cs571.org/rest/f24/ice/comments?num=${numComments}`, {
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        });
        const data = await resp.json();
        // data is a list of object, using map convert each one to string.
        return data.map(d => `${d.comment} was posted v=by ${d.author}`);
    }

    const handleLogin = async (promptData) => {
        return await delegator.beginDelegation("LOGIN", promptData);
        // stage = "FOLLOWUP_USERNAME";
        // return "Please enter your username.";
    }

    const handleCreateComment = async (promptData) => {
        return await delegator.beginDelegation("CREATE", promptData);
    }

    const handleLogout = async (promptData) => {
        if (await isLoggedIn()) {
            await logout();
            return ofRandom([
                "You have been signed out, goodbye!",
                "You have been logged out."
            ])
        } else {
            return ofRandom([
                "You are not currently logged in!",
                "You aren't logged in."
            ])
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;