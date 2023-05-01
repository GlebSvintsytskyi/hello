import DialogModel from '../schemas/Dialog.js';
import MessageModel from '../schemas/Message.js';
import mongoose from 'mongoose';

class DialogController {
    getDialogs = async(req, res) => {
        console.log(req)
        try {
            const id = req.user.id;

            const dialogs = await DialogModel.find({ author: id }).populate(['author', 'partner']);

            res.json(dialogs);
        } catch (error) {
            console.log(error.message);
            res.status(404).json('Dialog not found');
        }
    }

    create = async(req, res) => {
        try {
            const postData = {
                author: req.body.author,
                partner: req.body.partner
            }
    
            const dialog = new DialogModel(postData);
            await dialog.save();


            const message = new MessageModel({
                text: req.body.text,
                user: req.body.author,
                dialog: dialog._id
            });
            await message.save();

            return res.json(dialog);
        } catch (error) {
            res.status(404).json(error);
        }
        
    }

    delete = async(req, res) => {
        try {
            const id = req.params.id;
            await DialogModel.findByIdAndRemove(id);
            return res.json({
                messages: 'Success'
            });
        } catch (error) {
            res.status(404).json({
                messages: 'Dialog isn`t remove'
            });
        }
    }
}

export default DialogController;