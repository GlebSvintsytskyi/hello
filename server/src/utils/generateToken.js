import jwt from 'jsonwebtoken';

export default (id, email, fullname, confirmed, last_seen, confirm_hash) => {
    return jwt.sign(
        {id, email, fullname, confirmed, last_seen, confirm_hash},
        process.env.JWT_SECRET_TOKEN,
        {expiresIn: '1h'}
    );
}