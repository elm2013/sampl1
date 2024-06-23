const { ConnectionModel } = require("../models/connections");

class ConnectionsService {
  async create(data) {
    return ConnectionModel.create(data);
  }

  async update(conditions, data) {
    return ConnectionModel.findOneAndUpdate(conditions, data, { new: true });
  }

  async delete(conditions) {
    return ConnectionModel.delete(conditions);
  }

  async findOne(conditions) {
    return ConnectionModel.findOne(conditions);
  }
}

module.exports = new ConnectionsService();
