const Express = require('express');


const app = Express();

// Middleware to log requests
app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next();
})

// Health Check Endpoint
app.get('/health',(req, res) => {
    res.json({ok:true});
});

// Info Endpoint
app.get('/info', (req,res)=>{
    res.json({"name":"AdminHub API","version":"1.0.0","status":"running"})
})



module.exports = app;