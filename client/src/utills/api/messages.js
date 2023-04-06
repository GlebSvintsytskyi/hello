import { axios } from '../../core';

const messagesApi =  {
    getAllByDialogId: (id) => axios.get('/messages?dialog=' + id)
}

export default messagesApi;