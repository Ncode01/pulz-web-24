import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import { errorHandler, requestLogger } from './middleware';
import { authRouter, studentsRouter, activitiesRouter } from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(requestLogger);

app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);
app.use('/api/activities', activitiesRouter);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(console.error);

export default app;
