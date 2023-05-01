import { error } from 'console';
import MessageModel from '../schemas/Message.js';

class MessageController {

    constructor(io) {
        this.io = io;
    }

    getMessages = async(req, res) => {
        try {
            const dialogId = req.query.dialog;

            const messages = await MessageModel.find({ dialog: dialogId }).populate(['dialog']);

            res.json(messages);
        } catch (error) {
            res.status(404).json('Messages not found');
        }
    }

    create = async(req, res) => {
        try {
            const postData = {
                text: req.body.text,
                dialog: req.body.dialog_id,
                user: req.user.id
            }
    
            const message = new MessageModel(postData);
            await message.save().then( () => {
                MessageModel
                    .populate(message, {path: 'dialog'})
                    .then( msg => {
                        res.status(200).json(msg);
                        this.io.emit('SERVER:NEW_MESSAGE', msg);
                    })
            });
        } catch (error) {
            res.status(404).json(error);
        }
    }

    delete = async(req, res) => {
        try {
            const id = req.params.id;
            await MessageModel.findByIdAndRemove(id);
            return res.json({
                messages: 'Success'
            });
        } catch (error) {
            res.status(404).json({
                messages: 'Message isn`t remove'
            });
        }
    }
}

export default MessageController;