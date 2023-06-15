import * as dotenv from 'dotenv'
import express from 'express';
import AuthController from './app/controllers/AuthController.js';
import sequelize from './app/config/database.js';
import authMiddleware from './app/middleware/authMiddleware.js';

dotenv.config();
const app = express();
const authController = new AuthController();
app.use(express.json());


app.post('/register', authController.register.bind(authController));
app.post('/login', authController.login.bind(authController));
app.get('/me', authMiddleware, authController.me.bind(authController));



sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(3001, () => {
      console.log('Auth microservice listening on port 3001');
    });
  })
  .catch((error) => {
    console.error('Failed to synchronize database:', error);
  });