const axios = require("axios");
const jwt = require("jsonwebtoken");

const key = require("fs").readFileSync("./env/tmvzg.private-key.pem");

function getToken() {
  return jwt.sign(
    {
      iss: process.env.APP_ID,
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3*60,
    },
    key,
    { algorithm: "RS256" }
  )
}

async function makeGithubRequest(method, url, body) {
  const result = await axios({
    method,
    url: "https://api.github.com" + url,
    headers: {
      "Accept": "application/vnd.github.v3+json, application/vnd.github.inertia-preview+json",
      "Authorization": `Bearer ${getToken()}`,
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