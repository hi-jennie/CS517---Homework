import { isLoggedIn, ofRandom, getLoggedInUsername } from "../Util";
const createPostSubAgent = (end) => {
    const CS571_WITAI_ACCESS_TOKEN = "EQYVVIESGF7XYHKEG6YHTD5B3QT5AMVT";
    let stage;
    let chatRoom;
    let title;
    let message;
    let conf;

    const handleInitialize = async (promptData) => {
        console.log(promptData);
        const hasSpecifiedRoom = promptData.entities['chat_room:chat_room'] ? true : false;
        if (!hasSpecifiedRoom) {
            return end("please specified a chatroom")
        } else {
            console.log(promptData.entities["chat_room:chat_room"][0]['value']);
            chatRoom = promptData.entities["chat_room:chat_room"][0]['value']
            stage = "FOLLOWUP_TITLE"
            return "Great! what should be the title of your post ?"
        }

    }

    const handleReceive = async (prompt) => {
        switch (stage) {
            case "FOLLOWUP_TITLE": return await handleFollowupTitle(prompt);
            case "FOLLOWUP_MESSAGE": return await handleFollowupMessage(prompt);
            case "FOLLOWUP_CONF": return await handleFollowupConf(prompt)
        }
    }

    const handleFollowupTitle = async (prompt) => {
        title = prompt;
        stage = "FOLLOWUP_MESSAGE"
        return "All right, what should be the content of your post ?"

    }

    const handleFollowupMessage = async (prompt) => {
        message = prompt;
        stage = "FOLLOWUP_CONF";
        return `Excellent, To confirm, you want to create the post title ${title} in ${chatRoom} ?`;
    }

    const handleFollowupConf = async (prompt) => {
        conf = prompt;
        stage = undefined;

        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(conf)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        console.log(data)
        if (data.intents.length > 0 && data.intents[0].name === 'wit$confirmation') {
            const res = await fetch(`https://cs571.org/rest/f24/hw11/messages?chatroom=${chatRoom}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    content: message
                })
            })
            if (res.status === 200) {
                return end({ msg: "comment posted successfully", emote: "SUCCESS" });
            } else {
                return end({ msg: "Comment failed to post, please try again.", emote: "error" });
            }
        } else {
            return end(ofRandom(["No worries, if you want yo create a comment in the future, just let me know!", "that's all right, if you want to create a comment , just ask"]));
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createPostSubAgent;