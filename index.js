const express = require('express');
const socketio = require("socket.io");
const http  = require("http");

const PORT = process.env.PORT || 5000
const router = require("./router");

const {addUser,removeUser,getUser,getUsersInRoom} = require("./users");

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const dblink = require('./configs/config').get(process.env.NODE_ENV);
const authRoutes = require('./routes/authroutes');
const commentRoutes = require('./routes/commentroutes')
const postRoutes = require('./routes/postroutes');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors:{
        origin:'*',
    }
});

app.use(router);
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());

//DB connections
mongoose.Promise = global.Promise;
mongoose.connect(dblink.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true},
    function(err){
        if(err) console.log(err);
        console.log("DB is connected");
    }
);

app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);

io.on("connection", (socket) => {

    socket.on("join", ({name,room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});
        if(error) return callback(error);

        socket.join(user.room);

        socket.emit("message", {user: "bot", text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit("message",{ user: "bot", text: `${user.name}, has joined`});

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", {user: user.name, text: message});
        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'bot', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    });
});

server.listen(PORT, () => console.log(`server has started on port: ${PORT}`));