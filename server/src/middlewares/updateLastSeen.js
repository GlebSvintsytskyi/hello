import UserModel from '../schemas/User.js';

export default async function (req, res, next) {
    await UserModel.findOneAndUpdate(
        { 
            _id: '6481eceb29440552c83e5fd4'
        },
        {  
            last_seen: new Date() 
        },
        {
            new: true
        }
    )
    next();
};