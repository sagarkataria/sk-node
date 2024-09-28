const express = require('express');

const app = express();

app.use((req,res)=>{
    res.send("Hello World");
})

app.listen(3000,()=>{
    console.log(`Server successfully listening on port http://localhost:${3000}`);
});

