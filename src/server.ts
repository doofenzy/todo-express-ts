import app from './app';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// app.listen(process.env.PORT || 3000, () => {
//   try {
//     console.log(`Server is running on port ${process.env.PORT || 3000}`);
//   } catch (error) {
//     console.error('Error starting the server:', error);
//     process.exit(1);
//   }
// });


mongoose.connect(process.env.MONGODB_URI: string { 

})