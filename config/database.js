const mongoose = require("mongoose");
const debug = require("debug")("mern:config:database");

// Set mongoose to debug mode if needed
mongoose.set("debug", true);

// Connection settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB using the env for the database URL
mongoose.connect(process.env.DATABASE_URL, options);

const db = mongoose.connection;

db.on("connected", function () {
  debug(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

db.on("error", (err) => {
  debug(`Database connection error: ${err}`);
});

db.on("disconnected", () => {
  debug("Mongoose disconnected");
});

// To handle closing the connection when the Node process ends
process.on("SIGINT", () => {
  db.close(() => {
    debug("Mongoose disconnected through app termination (SIGINT)");
    process.exit(0);
  });
});
process.on("SIGTERM", () => {
  db.close(() => {
    debug("Mongoose disconnected through app termination (SIGTERM)");
    process.exit(0);
  });
});
