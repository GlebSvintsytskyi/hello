import jwt_decode from 'jwt-decode';

export default function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({message: "Not authorized"});
        }
        const decoded = jwt_decode(token);
        req.user = decoded;
        
        return next();
    } catch (e) {
        res.status(403).json({ message: "Invalid auth token provided." });
    }
};