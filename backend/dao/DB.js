const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUrl = 'mongodb+srv://rachna_bharti:vXiJTE2lroaDdwa0@diagnostics.tlbmcml.mongodb.net/diagnostics?retryWrites=true&w=majority&appName=diagnostics';
    console.log(dbUrl);
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
