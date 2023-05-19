const controllers = require("../controllers");

module.exports = (socket, io) => {
  console.log("new connection", socket.id);

  socket.on("create_session", (data) =>
    controllers.sessionControllers.new(socket, io, data)
  );
  socket.on("new_message", (data) => {
    controllers.messageControllers.send(socket, io, data);
  });
};
