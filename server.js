const express = require('express')

const app = express()




// const send data to the client side 

app.get('/',(req,res)=>{
    res.send('Hello world')
})




// run the server on port 4200

app.listen(4200,()=>{
    console.log('Listening to server 4200')
})