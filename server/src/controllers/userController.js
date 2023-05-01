import UserModel from '../schemas/User.js';
import generateToken from '../utils/generateToken.js';

import bcrypt from 'bcrypt';
import jwt_decode from 'jwt-decode';

class UserController {
    getUser = async(req, res) => {
        console.log(req)
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            res.json(user);
        } catch (error) {
            res.status(404).json({
                messages: 'Not found'
            });
        }
    }

    getMe = async(req, res) => {
        try {
            const id = req.user.id;
            const user = await UserModel.findById(id);
            res.json(user);
        } catch (error) {
            res.status(404).json({
                messages: 'Not found'
            });
        }
    }

    createUser = async(req, res) => {
        try {
            const postData = {
                email: req.body.email,
                fullname: req.body.fullname,
                password: bcrypt.hashSync(req.body.password, 5)
              }

            const candidate = await UserModel.findOne({ email: postData.email });
             if (candidate) {
                 return res.json({
                     message: 'user already exists'
                 });
            }

            const user = new UserModel(postData);
            await user.save();
            const token = generateToken( user._id, user.email, user.fullname, user.confirmed, user.last_seen);

            return res.json({
                token,
                user
            });
        } catch (error) {
            res.json(error);
        } 
    }

    login = async(req, res) => {
        const {email, password} = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json('User not found');
        }

        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(403).json('Invalid password');
        }

        const token = generateToken(user._id, user.email, user.fullname, user.confirmed, user.last_seen);

        return res.json({
            token,
            user
        });
    }

    delete = async(req, res) => {
        try {
            const id = req.params.id;
            await UserModel.findByIdAndRemove(id);
            return res.json({
                messages: 'Success'
            });
        } catch (error) {
            res.status(404).json({
                messages: 'User isn`t remove'
            });
        }
    }
}

export default UserController;