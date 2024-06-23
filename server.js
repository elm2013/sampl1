const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { config } = require("dotenv");

config();

const app = express();
const routes = require("./src/routes/index");
const consume = require("./src/microservice/Consumer");

mongoose.connect(process.env.DB_CONN);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
////////////////////////////////////////
// const { Kafka } = require("kafkajs");

// const kafka = new Kafka({
//   clientId: "my-app",
//   brokers: ["kafka:9092"],
// });

// const admin = kafka.admin();

// const createTopic = async () => {
//   await admin.connect();
//   await admin.createTopics({
//     topics: [
//       { topic: "message-Megashid", numPartitions: 3, replicationFactor: 1 },
//     ],
//   });
//   await admin.disconnect();
// };

// createTopic().catch(console.error);
////////////////////////////////
consume().catch((err) => {
  console.error("error in consumer: ", err);
});
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Restful api service running on port ${process.env.Port} `)
);
