import { axiosAuth } from "../../core/axios";

const messagesApi =  {
    getAllByDialogId: (id) => axiosAuth.get('/messages?dialog=' + id),
    removeById: (id) => axiosAuth.delete('/messages/' + id),
    send: (text, dialogId, attachments) =>
    axiosAuth.post("/messages", {
      text: text,
      dialog_id: dialogId,
      attachments: [attachments]
    })
}

export default messagesApi;