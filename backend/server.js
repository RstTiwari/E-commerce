const app = require("./app");
const dotenv = require('dotenv');
const connectDatabse = require("./config/database")


// handling uncaughtError 
process.on("uncaughtException" , error =>{
    console.log("uncaughtException error is:" , error);
    console.log("Shutting down the server due to uncaught Error");
    server.close(()=>{
        process.exit(1);
    })
})


dotenv.config({path:"./config/config.env"});


// calling the database
connectDatabse()
 


const server = app.listen(process.env.PORT , ()=>{
    console.log(`the server is running on the localhost:\\ ${process.env.PORT}`)

})



//unhandeled Promise Rejection ;
process.on("unhandledRejection" , err=>{
    console.log("The unhandeled rejection has been caught")
    console.log("Clsoing down the server due to undandled Rejection" , err.stack)
server.close(() =>{
    process.exit(1)
})
})