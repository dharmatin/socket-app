var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static(__dirname + "/node_modules"));
app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/index.html");
})

io.on("connection", function(client) {
  console.log("Client Connected");

  client.on('join', function(data) {
    console.log(data);
    client.emit("messages", "Hello From Server");
  });
  
  client.on("messages", function(data) {
    console.log("MESSAGE FROM CLIENT", data);
    client.emit("broad", data);
    client.broadcast.emit("broad", data);
  })
})

server.listen(9191);