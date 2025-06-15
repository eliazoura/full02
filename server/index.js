import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de sécurité
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});
app.use(limiter);

// Auth rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Trop de tentatives de connexion, veuillez réessayer plus tard.'
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (avec données fictives pour l'instant)
const connectDB = async () => {
  try {
    // Pour l'instant, on simule une connexion MongoDB
    console.log('📦 Simulation de la connexion MongoDB réussie');
    
    // Création d'utilisateurs fictifs
    const mockUsers = [
      {
        id: '1',
        email: 'admin@example.com',
        password: '$2a$10$92SYnZXC5RYtEb6QrJr9Fe5EZMtTKvUl3QY5cqMlKGYQ7xQjfF1lK', // password: admin123
        name: 'Admin User',
        role: 'admin'
      },
      {
        id: '2',
        email: 'user@example.com',
        password: '$2a$10$92SYnZXC5RYtEb6QrJr9Fe5EZMtTKvUl3QY5cqMlKGYQ7xQjfF1lK', // password: user123
        name: 'John Doe',
        role: 'user'
      }
    ];
    
    global.mockUsers = mockUsers;
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🌐 API disponible sur http://localhost:${PORT}/api`);
  });
};

startServer();