
const createChatAgent = () => {

    // CS571_WITAI_ACCESS_TOKEN 是 Wit.ai 提供的 API 密钥，允许你访问其服务。
    // Put your CLIENT access token here.
    const CS571_WITAI_ACCESS_TOKEN = "N36NP6TQXVL5YEJIEJHPTMRZRJIGNALU";

    let jokeNum = 0;

    const handleInitialize = async () => {
        return "hello! what would you like to hear"
    }

    const handleReceive = async (prompt) => {
        console.log(prompt)
        // return fetch("https://api.wit.ai/message?q=" + encodeURIComponent(prompt), {
        //     headers: {
        //         "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         if (data.intents.length === 0) {
        //             return "I don't understand"
        //         } else {
        //             const intentName = data.intents[0].name;
        //             if (intentName === "tell_joke") {
        //                 return "I should get a joke"
        //             } else if (intentName === "why_chicken") {
        //                 return "To get to the other side"
        //             } else {
        //                 return "Will never happen"
        //             }
        //         }
        //     });

        let res = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(prompt), {
            headers: {
                "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
            }
        });
        let data = await res.json();
        if (data.intents.length === 0) {
            return "I don't understand"
        } else {
            const intentName = data.intents[0].name;
            if (intentName === "tell_joke") {
                return await tellJoke();
            } else if (intentName === "why_chicken") {
                return await whyChicken();
            } else {
                return "Will never happen"
            }
        }
        //  return "I should get a joke"; 返回的是一个字符串。
        // 由于这个函数是 async，它会自动将这个字符串包装成一个 Promise，所以当 await 调用这个 async 函数时，你获取到的是一个已解析的 Promise，其中的值就是那个字符串。

    }

    async function whyChicken() {
        return "To get to the other side"
    }

    async function tellJoke() {
        const resp = await fetch("https://v2.jokeapi.dev/joke/any?safe-mode");
        const data = await resp.json();
        if (data.setup) {
            return data.setup + " " + data.delivery
        } else {
            return data.joke
        }

    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;