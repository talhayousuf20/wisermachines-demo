const io = require("socket.io-client");

const client = io("http://115.186.183.129:27000", {
  // WARNING: in that case, there is no fallback to long-polling
  transports: ["websocket"], // or [ 'websocket', 'polling' ], which is the same thing
});

client.emit("send-data-demo-machine", { _id: "5fdf35e885790c04ec5d431b" });

client.on("data-demo-machine-5fdf35e885790c04ec5d431b", (parseJSON) => {
  try {
    console.log(parseJSON);
  } catch (e) {}
});
