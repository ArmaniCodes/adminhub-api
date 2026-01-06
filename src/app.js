const express = require('express');
const app = express();
const authRouter = require('./routes/auth')

// Middleware to parse JSON bodies
app.use(express.json());


// Middleware to log requests
app.use((req,res,next)=>{
    console.log(req.method,req.path,req.body);
    next();
})

// Mount auth routes
app.use("/auth",authRouter);

// Health Check Endpoint
app.get('/health',(req, res) => {
    res.json({ok:true});
});

// Info Endpoint
app.get('/info', (req,res)=>{
    res.json({"name":"AdminHub API","version":"1.0.0","status":"running"})
})



module.exports = app;