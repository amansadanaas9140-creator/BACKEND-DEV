const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  membershipType: { type: String, required: true, enum: ['Normal', 'Gold'] }
});

module.exports = mongoose.model('Member', memberSchema);
