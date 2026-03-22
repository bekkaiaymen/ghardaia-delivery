const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Use environment variable for security)
// For local testing without Mongo, you can comment this out or use a local URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ghardaia_delivery';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Order Schema
const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  itemDescription: String,
  status: { type: String, default: 'pending' }, // pending, accepted, delivering, delivered
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Ghardaia Delivery API is running</h1>');
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, pickupLocation, deliveryLocation, itemDescription } = req.body;
    
    const newOrder = new Order({
      name,
      phone,
      pickupLocation,
      deliveryLocation,
      itemDescription
    });

    await newOrder.save();
    console.log('Order received:', newOrder);
    res.status(201).json({ success: true, message: 'تم استلام طلبك بنجاح! سنتصل بك قريباً.', order: newOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء حفظ الطلب.' });
  }
});

// Get all orders (For admin dashboard - basic implementation)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
