const server = require("./api/server.js");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;

server.use("/api", (req, res) => {
  res.status(200).json({ data: "API info here " });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
