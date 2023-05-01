import jwt from 'jsonwebtoken';

export default (id, email, fullname, confirmed, last_seen) => {
    return jwt.sign(
        {id, email, fullname, confirmed, last_seen},
        'yZkwjTZUVwk49zM',
        {expiresIn: '1h'}
    );
}