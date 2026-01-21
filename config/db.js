import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // If already connected, return existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/quickcart`, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  // Await the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
