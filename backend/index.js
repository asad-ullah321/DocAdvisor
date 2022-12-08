const express = require("express")
const app = express()
const cors = require("cors")
const fs= require("fs");
const http = require('http').Server(app);
const path = require('path');
app.set("view engine", "ejs");
const PORT = 5000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
app.use(cors({origin: 'http://localhost:3000',credentials: true})) // Use this after the variable declaration
//Availble routes
app.use(express.json())
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/static", express.static("assets"))

app.use('/api/user', require('./routes/routes'));
let users = []

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});