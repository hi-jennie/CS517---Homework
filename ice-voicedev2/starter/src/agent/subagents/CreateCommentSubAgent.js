import { isLoggedIn, ofRandom } from "../Util"

const createCommentSubAgent = (end) => {
    const CS571_WITAI_ACCESS_TOKEN = "ICP4MJRTVQ6NS6GTY7UF2M2TA33OEHEY";
    let stage;
    let comment;
    let conf;

    const handleInitialize = async (promptData) => {
        if (isLoggedIn()) {
            stage = "FOLLOWUP_COMMENT";
            return "What would you like to comment?";
        } else {
            return end("You are not logged in! Please log in to comment.");
        }

    }

    const handleReceive = async (prompt) => {
        switch (stage) {
            case "FOLLOWUP_COMMENT": return await handleFollowupComment(prompt);
            case "FOLLOWUP_CONFIRM": return await handleFollowupConfirm(prompt);
        }
    }

    const handleFollowupComment = async (prompt) => {
        comment = prompt;
        stage = "FOLLOWUP_CONFIRM";
        return "Are you sure you want to post this comment?";
    }

    const handleFollowupConfirm = async (prompt) => {
        conf = prompt;
        stage = undefined;

        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(conf)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0 && data.intents[0].name === 'wit$confirmation') {
            const res = await fetch("https://cs571.org/rest/f24/ice/comments", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    comment: comment
                })
            })
            if (res.status === 200) {
                return end(ofRandom(["Comment posted successfully!", "Comment posted!", "Comment posted! Thanks for your feedback!"]));
            } else {
                return end(ofRandom(["Comment failed to post, please try again.", "Comment failed to post, please try again."]));
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

export default createCommentSubAgent;