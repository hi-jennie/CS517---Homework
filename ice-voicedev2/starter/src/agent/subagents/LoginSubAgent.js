import { isLoggedIn, ofRandom } from "../Util"

const createLoginSubAgent = (end) => {

    let stage;
    let username;
    let password;

    const handleInitialize = async (promptData) => {
        stage = "FOLLOWUP_USERNAME";
        return "Great, what's your username?";
    }

    const handleReceive = async (prompt) => {
        switch (stage) {
            case "FOLLOWUP_USERNAME": return await handleFollowupUsername(prompt);
            case "FOLLOWUP_PASSWORD": return await handleFollowupPassword(prompt);
        }
    }

    const handleFollowupUsername = async (prompt) => {
        username = prompt;
        stage = "FOLLOWUP_PASSWORD";
        return "Great, what's your password?";
    }

    const handleFollowupPassword = async (prompt) => {
        password = prompt;
        console.log(password);
        stage = undefined;
        const res = await fetch("https://cs571.org/rest/f24/ice/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        if (res.status === 200) {
            return end("Login successful!");
        } else {
            return end("Login failed, please check your credentials and try again.");
        }

    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createLoginSubAgent;