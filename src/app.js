const Express = require('express');


const app = Express();

app.get('/health',(req, res) => {
    res.json({ok:true});
});

module.exports = app;