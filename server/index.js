var app = require('http').createServer();
var io= module.exports.io = require("socket.io")(app);
const PORT = process.env.PORT || 3231
const SocketMenager = require("./SocketMenager");

io.on("connection", SocketMenager);
app.listen(PORT, () =>{
  console.log("Connected to port: " + PORT);
} )
