const express = require('express');
require('./config/database')
const app = express();


app.listen(3000,()=>{
    console.log(`Server successfully listening on port http://localhost:${3000}`);
});

