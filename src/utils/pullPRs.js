const axios = require("axios");

module.exports = (repoName, token) =>
  axios.get(`https://api.github.com/repos/${repoName}/pulls?state=open`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  });
