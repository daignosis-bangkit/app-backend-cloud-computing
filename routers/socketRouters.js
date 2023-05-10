const controllers = require("../controllers");

module.exports = (socket, io) => {
  console.log("new connection", socket.id);

  socket.on("create_room", (data) =>
    controllers.roomControllers.new(socket, io, data)
  );
	socket.on("new_message", (data) => {
		controllers.messageControllers.send(socket, io, data)
	})
};