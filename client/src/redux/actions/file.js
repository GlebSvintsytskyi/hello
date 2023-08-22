// import fileApi from "../../utills/api/file";
import { axiosAuth } from "../../core/axios";

const fileActions = { 
    setFile: items => ({
        type: 'ATTACHMENTS:ADD_FILE',
        payload: items
    }),

    fetchSendFile: ( file ) => dispatch => {
        dispatch( fileActions.setFile(file) );
        axiosAuth.post('/files', {
            images: file
        });
    },
}

export default fileActions;