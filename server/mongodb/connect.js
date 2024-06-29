import mongoose from 'mongoose';

const connectDB = (url, callback) => {
  mongoose.set('strictQuery', true);

  mongoose
    .connect(url)
    .then(() => {
      console.log('MongoDB connected');
      callback();
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
