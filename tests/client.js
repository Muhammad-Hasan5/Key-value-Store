import net from "net";

const client = net.createConnection({ port: 6379 }, () => {
  console.log("Connected");

  client.write("SET name ali\n");
  client.write("GET name\n");
});

client.on("data", (data) => {
  console.log("Response:", data.toString());
});

client.on("end", () => {
  console.log("Disconnected");
});
