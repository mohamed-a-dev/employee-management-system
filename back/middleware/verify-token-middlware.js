import jwt from 'jsonwebtoken'
import Unauthenticated from '../errors/Unauthenticated.js';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new Unauthenticated('Provide a valid authentication header')

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username, roleId } = decoded;
        req.user = { id, username, roleId };
        
        next();
    } catch (e) {
        throw new Unauthenticated('Invalid email or password');
    }
}

export default verifyToken;