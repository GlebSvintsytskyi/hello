import { axiosAuth } from "../../core/axios";

const dialogsApi =  {
    getAll: () => axiosAuth.get('/dialogs')
}

export default dialogsApi;