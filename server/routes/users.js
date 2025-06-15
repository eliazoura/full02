import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token d\'accès requis' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide' });
  }
};

// Obtenir tous les utilisateurs (admin seulement)
router.get('/', authenticateToken, (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const users = global.mockUsers.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }));

    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Obtenir le profil utilisateur
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const user = global.mockUsers.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

export default router;