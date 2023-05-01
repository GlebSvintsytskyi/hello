import UserModel from '../schemas/User.js';

export default async function (req, res, next) {
    await UserModel.findOneAndUpdate(
        { 
            _id: '642c184acb215182c65a1fff' 
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