const router = require("express").Router();

router.post("/webhook", (req, res) => {
  console.log(">WEBHOOK REQUEST");
  console.log(req);
  res.status(200).end();
});

router.get("/login-redirect", (req, res) => {
  console.log(">LOGIN REDIRECT");
  console.log(req);
  res.status(200).end();
});

module.exports = router;
