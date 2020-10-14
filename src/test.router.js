const router = require("express").Router();
const github = require("./utils/githubRequest");

router.get("/github/users/:username", async (req, res) => {
    try {
        const result = await github.get(`/users/${req.params.username}/projects`);
        res.json(result);
    } catch (e) {
        console.error("Request failed", e)
        res.status(500).json(e);
    }
});

router.get("/github/*", async (req, res) => {
    try {
        const result = await github.get("/" + req.params[0]);
        res.json(result);
    } catch (e) {
        console.error("Request failed", e)
        res.status(500).json(e);
    }
})

module.exports = router;