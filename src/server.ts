import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Database connection and at the same time starting the server
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running & connected to MongoDB`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

//  handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled rejections and graceful shutdown
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

// Handle SIGINT (Ctrl+C) for graceful shutdown
// Both SIGINT and SIGTERM are used to gracefully shut down the server
// when the process is terminated, allowing for cleanup operations like closing database connections.
// both supports windows and unix operating systems
// SIGINT is typically sent when the user interrupts the process (e.g., Ctrl+C in the terminal).
const gracefulShutdown = () => {
  console.log('shutting down gracefully');
  mongoose.connection
    .close()
    .then(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error closing MongoDB connection:', error);
      process.exit(1);
    });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
