const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory users (hashed passwords)
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$kD9n.PEItK/dfmYVzN4YruqGlfdEoL17MPKynAqgU6r3IRGgVtFCW', // admin123
    avatar: 'https://example.com/avatar1.png',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'demo@example.com',
    password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9PQt.M5eMwwwVm', // password123
    avatar: 'https://example.com/avatar2.png',
    role: 'user'
  }
];

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Login attempt:', email); // Debug

  try {
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (err) {
    console.error('🔥 Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      role: 'user'
    };

    users.push(newUser);

    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('🔥 Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/auth/me
const getCurrentUser = (req, res) => {
  const userId = req.user.userId;
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role
  });
};

module.exports = {
  login,
  register,
  getCurrentUser
};
