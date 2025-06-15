import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Validation middleware
const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').isLength({ min: 2 }).trim()
];

// Login
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    // Recherche de l'utilisateur dans les données fictives
    const user = global.mockUsers.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Vérification du mot de passe (simulé)
    const isValidPassword = password === 'admin123' || password === 'user123';
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Register
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = global.mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Créer un nouvel utilisateur (simulé)
    const newUser = {
      id: String(global.mockUsers.length + 1),
      email,
      password: await bcrypt.hash(password, 10),
      name,
      role: 'user'
    };

    global.mockUsers.push(newUser);

    // Génération du token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Verify token
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = global.mockUsers.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Token invalide' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
});

export default router;