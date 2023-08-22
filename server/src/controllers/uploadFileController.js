import FileModel from '../schemas/File.js';
import cloudinary from '../utils/cloudinary.js';

class UploadFileController {

    index = async(req, res) => {
       try {
            const userId = req.user.id;
            const file = req.file;
            
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async ( error, result ) => {
                const fileData = {
                    filename: result.etag,
                    size: result.bytes,
                    ext: result.format,
                    url: result.secure_url,
                    user: userId
                };
    
                const uploadedFile = new FileModel(fileData);
    
                const fileObj = await uploadedFile.save();
    
                res.json({
                    message: "success",
                    fileObj
                });
            })
            .end(file.buffer);
       } catch (error) {
            res.json({
                message: 'error',
                error
            })
       }
    }

    createAudioMessage = async(req, res) => {
        
    }
}

export default UploadFileController;