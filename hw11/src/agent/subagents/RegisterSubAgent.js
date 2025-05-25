import { isLoggedIn, ofRandom, getLoggedInUsername } from "../Util";
const createRegisterSubAgent = (end) => {

    let stage;
    let username;
    let password;
    let conf;

    const handleInitialize = async (promptData) => {
        const isLogin = await isLoggedIn();
        if (isLogin) {
            console.log(isLogin)
            return end("Register_you need to be logged out before register")
        } else {
            stage = "FOLLOWUP_USERNAME"
            return ofRandom(["register_Enter your username", "register_Type your username"])
        }
    }

    const handleReceive = async (prompt) => {
        switch (stage) {
            case "FOLLOWUP_USERNAME": return await handleFollowupUsername(prompt);
            case "FOLLOWUP_PASSWORD": return await handleFollowupPassword(prompt);
            case "FOLLOWUP_CONF": return await handleFollowupConf(prompt)
        }
    }

    const handleFollowupUsername = async (prompt) => {
        username = prompt;
        stage = "FOLLOWUP_PASSWORD";
        return ofRandom(["register_Enter your password", "register_Type your password"]);
    }

    const handleFollowupPassword = async (prompt) => {
        password = prompt;
        stage = "FOLLOWUP_CONF";
        return ofRandom(["register_Enter your password again", "register_Type your password again"]);
    }

    const handleFollowupConf = async (prompt) => {
        conf = prompt;
        stage = undefined;
        if (password.length !== 7) {
            return end("register_the password must be 7 digits")
        } else if (password !== conf) {
            return end("register_Passwords do not match")
        } else {
            const resp = await fetch("https://cs571.org/rest/f24/hw11/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    pin: password
                })
            })
            if (resp.status === 200) {
                return end("register successful!")
            } else {
                const returnData = await resp.json();
                console.log(returnData)
                return end(returnData.msg)
            }
        }



    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createRegisterSubAgent;