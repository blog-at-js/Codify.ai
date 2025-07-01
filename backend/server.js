require('dotenv').config()
const app = require("./src/app.js")


app.listen(8000, (req, res)=>{
    console.log("Server is running on port 8000")
})