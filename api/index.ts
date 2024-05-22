import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongo_uri = process.env.MONGO_URI || '';
const port = process.env.PORT || 3000;

mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => console.log('DB error', err));

const app = express();

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
