const mongoose = require("mongoose");
const { Schema } = mongoose;
const ValueTypeEnum = Object.freeze({
  INTEGER: "int",
  STRING: "str",
  FLOAT: "float",
});
const connectionSchema = new Schema(
  {
    name: { type: String, minlength: 2, required: true },
    parameters: [
      {
        key: { type: String },
        valueType: { type: String, enum: ValueTypeEnum },
      },
    ],
  },
  {
    collection: "connections",
    timestamps: true,
  }
);
connectionSchema.plugin(require("mongoose-delete"), {
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});
const ConnectionModel = mongoose.model("connections", connectionSchema);

module.exports = { ConnectionModel, ValueTypeEnum };
