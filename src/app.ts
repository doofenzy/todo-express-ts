import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
// import AppError from './utils/AppError';
import authRoutes from './routes/AuthRoutes';
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404));
// });

export default app;
