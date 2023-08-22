import UserModel from '../schemas/User.js';
import generateToken from '../utils/generateToken.js';
import gmailSendMailer from '../utils/gmailSendMailer.js';

import bcrypt from 'bcrypt';

class UserController {

    getUser = async(req, res) => {
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

    findUsers = async(req,  res) => {
        const query = req.query.query;
        UserModel.find()
          .or([
            { fullname: new RegExp(query, "i") },
            { email: new RegExp(query, "i") },
          ])
          .then((users) => res.json(users))
          .catch((err) => {
            return res.status(404).json({
              status: "error",
              message: err,
            });
          });
      };

    verify = async(req, res) => {
        const hash = req.query.hash;
        if (!hash) {
            return res.json({
                status: 422,
                message: 'Invalid hash'
            });
        }

        const user = await UserModel.findOne({ confirm_hash: hash });
        if (!user) {
            return res.json({
                status: 403,
                message: 'Hash not found'
            });
        }

        user.confirmed = true;
        await user.save();

        res.json({
            status: 'success',
            message: 'Success verify'
        })
    }

    createUser = async(req, res) => {
        try {
            const postData = {
                email: req.body.email,
                fullname: req.body.fullname,
                password: bcrypt.hashSync(req.body.password, 5),
            }

            if (req.body.password !== req.body.password_2) {
                return res.status(403).json({
                    message: 'password mismatch'
                });
            }

            const candidate = await UserModel.findOne({ email: postData.email });
             if (candidate) {
                 return res.status(403).json({
                     message: 'user already exists'
                 });
            }

            const user = new UserModel(postData);
            await user.save();
            await gmailSendMailer(user.email, user.confirm_hash);
            const token = generateToken( user._id, user.email, user.fullname, user.confirmed, user.last_seen, user.confirm_hash);

            return res.status(200).json({
                token,
                user
            });
        } catch (error) {
            res.status(403).json(error);
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

        return res.status(200).json({
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