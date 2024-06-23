const ConnectionsService = require("./../services/connections");
const transform = require("./../utils/apiResponse");
const producer = require("./../microservice/Producer");
const influxQuery = require("./../utils/queryInflux");
module.exports = new (class ConnectionsController {
  //create connection
  async createConnections(req, res) {
    let data = { ...req.body };
    const findedConnectionName = await ConnectionsService.findOne({
      name: data.name,
    });
    if (findedConnectionName) {
      return transform.validationError(
        res,
        "نام کانکشن وارد شده تکراری است.",
        "name"
      );
    }

    const createdDate = await ConnectionsService.create({
      name: data.name,
      parameters: data.parameters,
    });
    return transform.successRespond(
      res,
      "کانکشن  با موفقیت ثبت شد",
      createdDate
    );
    // return res;
  }

  async editConnections(req, res) {
    let connectionName = req.params.connectionName;
    let parameters = req.body.parameters;
    console.log(parameters);
    const updateConnection = await ConnectionsService.update(
      { name: connectionName },
      { parameters }
    );
    if (updateConnection) {
      return transform.successRespond(
        res,
        "کانکشن  با موفقیت ویرایش شد",
        updateConnection
      );
    }
  }

  async deleteConnections(req, res) {
    let connectionName = req.params.connectionName;
    const delteddta = await ConnectionsService.delete({ name: connectionName });
    //delete data
    //     let query = `
    //     DROP SERIES  from(bucket: "${process.env.INFLUXDB_BUCKET}")
    //     |> range(start: -inf)
    //     |> filter(fn: (r) => r["_measurement"] == "${connectionName}")
    // `.trim();
    //     try {
    //       await influxQuery(query);

    //       return transform.successRespond(res, "کانکشن  با موفقیت حذف شد", "");
    //     } catch (error) {
    //       console.error(error);
    //       return transform.ErrorRespond(res, "Error fetching data", error);
    //     }
    return transform.successRespond(res, "کانکشن  با موفقیت حذف شد", "");
  }

  async sendData(req, res) {
    let data = { ...req.body };
    data["connectionsName"] = req.params.connectionName;
    console.log(data);
    await producer(data).catch((err) => {
      console.error("error in producer: ", err);
    });
    return transform.successRespond(
      res,
      "ارسال دیتا با موفقیت انجام شد.",
      "  با موفقیت ثبت شد"
    );
  }

  async getData(req, res) {
    const measurement = req.params.connectionName;
    const startTime = req.query.startTime
      ? new Date(req.query.startTime).toISOString()
      : new Date(Date.now() - 5 * 3600000).toISOString(); // 5 hour ago
    const stopTime = req.query.stopTime
      ? new Date(req.query.stopTime).toISOString()
      : new Date().toISOString();

    const name = req.query.name || "";
    //range(start:  -inf)
    //  range(start: ${startTime}, stop: ${stopTime})
    // and r["_time"]>=${startTime} and r["_time"]<=${stopTime}
    let query = `
    from(bucket: "${process.env.INFLUXDB_BUCKET}")
      |> range(start: ${startTime}, stop: ${stopTime})
      |> filter(fn: (r) => r["_measurement"] == "${measurement}" )
  `;

    if (name) {
      query += ` |> filter(fn: (r) => r["name"] == "${name}" )`;
    }
    query += ` |> limit(n: 10)`;

    try {
      let foundedData = await influxQuery(query);

      return transform.successRespond(res, "با موفقیت یافت شد", foundedData);
    } catch (error) {
      console.error(error);
      return transform.ErrorRespond(res, "Error fetching data", error);
    }
  }
})();
