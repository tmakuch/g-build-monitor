const tunnel = require('localtunnel');

(async () => {
    const conn = await tunnel({
        port: process.env.APP_PORT || 90,
        subdomain: process.env.TUNEL_DOMAIN || "formyboardislongandthick",
        local_host: process.env.MAIN_POD_NAME || "app",

    });

    console.log("Tunnel created to", conn.url);

    process.on("SIGTERM",async () => {
        await conn.close();
    })

    conn.on('close', () => {
        console.log("Tunnel closed");
    });
})();