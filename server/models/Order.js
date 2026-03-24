const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderType: {
    type: String,
    enum: ['Custom Box', 'Standard Product'],
    required: true
  },
  budget: {
    type: Number,
    required: function() { return this.orderType === 'Custom Box'; }
  },
  flavors: [{
    type: String
  }],
  productName: {
    type: String,
    required: function() { return this.orderType === 'Standard Product'; }
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  customerPhone: {
    type: String, // Useful to have, though not explicitly asked, good practice.
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
