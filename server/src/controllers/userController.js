const UserModel = require('../schemas/User');

class UserController {
    async getUser(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            return res.json(user);
        } catch (error) {
            res.status(404).json({
                messages: 'Not found'
            });
        }
    }

    async getMe(req, res) {
        // Create func 
    }

    async createUser(req, res) {
        try {
            const postData = {
                email: req.body.email,
                fullname: req.body.fullname,
                password: req.body.password
              }
              const user = new UserModel(postData);
              await user.save();
              return res.json(user);
        } catch (error) {
            res.json(error);
        } 
    }

    async delete(req, res) {
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

module.exports = new UserController();