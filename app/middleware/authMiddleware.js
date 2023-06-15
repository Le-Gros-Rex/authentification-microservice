import { verifyToken } from '../helpers/auth.js';

async function authMiddleware(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }

    try {
        const decoded = await verifyToken(token);

        if (!decoded.access.includes('authentication')) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

export default authMiddleware;
