import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // First try to get token from cookies
  let token = req.cookies.token;
  
  // Fallback to Authorization header for flexibility
  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};
