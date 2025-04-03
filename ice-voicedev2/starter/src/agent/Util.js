
const ofRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const isLoggedIn = async () => {
    const resp = await fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/whoami", {
        credentials: "include",
        headers: {
            "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
        }
    })
    const body = await resp.json();
    return body.isLoggedIn;
}

const logout = async () => {
    await fetch("https://cs571.org/rest/f24/ice/logout", {
        method: "POST",
        credentials: "include",
        headers: {
            "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
        }
    })
}

export {
    ofRandom,
    isLoggedIn,
    logout
}