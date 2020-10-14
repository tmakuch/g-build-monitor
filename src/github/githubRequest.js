const axios = require("axios");

async function makeGithubRequest(method, url, body) {
    const result = await axios({
        method,
        url: "https://api.github.com" + url,
        headers: {
            "Accept": "application/vnd.github.v3+json, application/vnd.github.inertia-preview+json"
        },
        data: body
    });

    if (result.status >= 400) {
        throw result;
    }

    return result.data;
}

module.exports = {
    get: (url) => makeGithubRequest("GET", url),
    post: (url, data) => makeGithubRequest("POST", url, data),
};