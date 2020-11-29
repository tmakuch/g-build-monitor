const router = require("express").Router();
const { get } = require("./githubRequest");

router.post("/webhook", (req, res) => {
  console.log(">WEBHOOK REQUEST");
  console.log(req);
  res.status(200).end();
});

router.get("/login-redirect", async (req, res) => {
  console.log(">LOGIN REDIRECT");
  console.log(req);
  const { code, installation_id, setup_action } = req.query;

  if (setup_action !== "install") {
    return res.send("You need to install the app from github.");
  }

  const access_keys = await get(`/app/installations/${installation_id}`);

  res.status(200).end();
});

module.exports = router;
