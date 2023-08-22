import create from "@ant-design/icons/lib/components/IconFont";
import { axiosAuth } from "../../core/axios";

const dialogsApi =  {
    getAll: () => axiosAuth.get('/dialogs'),
    create: (authorId, partnerId, message) => axiosAuth.post('/dialogs', {
        author: authorId,
        partner: partnerId,
        text: message
    })
}

export default dialogsApi;