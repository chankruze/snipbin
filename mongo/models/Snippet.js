const mongoose = require("mongoose");

// const opts = {
//   toJSON: {
//     virtuals: true,
//   },
//   toObject: {
//     virtuals: true,
//   },
//   timestamps: false,
// };

const snippetSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Snippet", snippetSchema);
