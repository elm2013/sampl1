// // Kafka consumer to read data and save to InfluxDB
const { Kafka } = require("kafkajs");
const { InfluxDB, Point } = require("@influxdata/influxdb-client");
const influxCilent = require("./../utils/influxConfig");
const topic = process.env.KAFKA_TOPIC;
const clientId = process.env.KAFKA_CLIENTID;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;
const brokers = [process.env.KAFKA_BROKER];

const kafka = new Kafka({ clientId, brokers });

const consumer = kafka.consumer({ groupId: clientId });
// Kafka consumer
const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());

      // Save data to InfluxDB
      try {
        const writeClient = influxCilent.getWriteApi(org, bucket, "ms");
        const point = new Point(data.connectionsName)
          .tag("name", data.name)
          .stringField("value", data.value)
          .timestamp(data.time);
        await writeClient.writePoint(point);
        console.log(` ${point}`);

        writeClient.close().then(() => {
          console.log("WRITE FINISHED");
        });
      } catch (error) {
        console.error("Error saving data to InfluxDB:", error);
      }
    },
  });
};

module.exports = consume;
