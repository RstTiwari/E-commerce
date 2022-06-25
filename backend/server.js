const app = require("./app");
const dotenv = require('dotenv');
const connectDatabse = require("./config/database")



dotenv.config({path:"./config/config.env"});

// calling the database
connectDatabse()





const server = app.listen(process.env.PORT , ()=>{
    console.log(`the server is running on the localhost:\\ ${process.env.PORT}`)

})