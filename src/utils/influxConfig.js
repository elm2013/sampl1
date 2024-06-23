const { InfluxDB, InfluxDBClient } = require("@influxdata/influxdb-client");

const url =
  // "http://localhost:8086";
  process.env.INFLUXDB_URL;
const token =
  // "eQ5RiHWyYPTkR_u5ipjn1KD5CQvZKVbjk02cy0n1ReCdUj7rmA25zYk4xF6HM0xNs5KIXVk7dUccSpYlxBJOgg==";
  process.env.INFLUXDB_TOKEN;

const client = new InfluxDB({ url, token });

module.exports = client;
