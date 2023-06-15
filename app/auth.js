import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (payload, expiresIn) => {

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
    token = token.slice(7); // Remove 'Bearer ' from token
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const protectRoute = (request, response, next) => {
    const token = request.headers.authorization;
    if (!token) {
        response.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        response.status(401).json({ error: 'Invalid token' });
    }
};
