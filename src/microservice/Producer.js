// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs");
const topic = process.env.KAFKA_TOPIC;
const clientId = process.env.KAFKA_CLIENTID;
const brokers = [process.env.KAFKA_BROKER];

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();

// we define an async function that writes a new message each second
const produce = async (data) => {
  await producer.connect();
  try {
    // send a message to the configured topic with
    // the key and value formed from the current value of `i`
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(data) }],
    });
    await producer.disconnect();
  } catch (err) {
    console.error("could not write message " + err);
  }
};

module.exports = produce;
