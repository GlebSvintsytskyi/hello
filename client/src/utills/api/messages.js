import { axiosAuth } from "../../core/axios";

const messagesApi =  {
    getAllByDialogId: (id) => axiosAuth.get('/messages?dialog=' + id)
}

export default messagesApi;