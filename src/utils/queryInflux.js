const influxClient = require("./../utils/influxConfig");

const getQuery = async (query) => {
  try {
    const queryApi = await influxClient.getQueryApi(process.env.INFLUXDB_ORG);
    const dataFound = [];

    await new Promise((resolve, reject) => {
      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const obj = tableMeta.toObject(row);
          dataFound.push({
            time: obj._time,
            name: obj.name,
            value: obj._value,
          });
        },
        error(error) {
          console.error(error);
          reject(error);
        },
        complete() {
          console.log("Query completed successfully");
          resolve();
        },
      });
    });

    return dataFound;
  } catch (error) {
    console.error("An error occurred during query execution:", error);
    throw error;
  }
};

module.exports = getQuery;
