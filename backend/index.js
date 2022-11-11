const express = require("express");
const app = express();
const port = 5000;
//const publicpath = path.join(_driname, '/public');


//Availble routes
app.use(express.json())
app.use(cors()) // Use this after the variable declaration

app.use('/api/user', require('./routes/routes'));


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
 


connectToMongo();
