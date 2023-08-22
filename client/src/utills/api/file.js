import { axiosAuth } from "../../core/axios";

const fileApi =  {
    upload: (file) => {
        const formData = new FormData();
        formData.append("files", file);
        return axiosAuth.post("/files", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}

export default fileApi;