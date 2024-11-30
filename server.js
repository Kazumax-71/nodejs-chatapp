const express = require("express");
const app = express();
// http module : not necessary to import for use
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3030;

// __dir refering to currnet directory
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

// onは受け取るという意味。
// client(index.html)でインスタンス化したsocketをio.onが受け取る
io.on('connection', (socket) => {
  console.log('a user connected');

  // accept message from client
  socket.on("chat message", (msg) => {
    // send message to client in public
    io.emit("chat message", msg);
  });
});


server.listen(PORT, () => {
  console.log("listening on 3030");
});
