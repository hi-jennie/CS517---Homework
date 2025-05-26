import { isLoggedIn, ofRandom, getLoggedInUsername } from "../Util";
const createLoginSubAgent = (end) => {

    let stage;
    let username;
    let password;

    const handleInitialize = async (promptData) => {
        // 在if (isLogin) 不能直接使用isLoggedIn() 应为他是一个promise
        // after register, it will login automatically
        const isLogin = await isLoggedIn();
        if (isLogin) {
            console.log(isLogin)
            return end("Login_you need to be logged out before logging in")
        } else {
            stage = "FOLLOWUP_USERNAME"
            return ofRandom(["Login_what's your username ?", "Login_tell me your username"])
        }
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
        return { msg: "Great, what's your password?", nextIsSensitive: true }
    }

    const handleFollowupPassword = async (prompt) => {
        password = prompt
        console.log(password)
        stage = undefined;
        const res = await fetch("https://cs571.org/rest/f24/hw11/login", {
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
        if (res.status === 200) {
            return end({ msg: "login successfully", emote: "SUCCESS" });
        } else {
            return end({ msg: "Login failed, please check your credentials and try again.", emote: "error" });
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createLoginSubAgent;