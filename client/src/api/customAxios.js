import axios from "axios";

const apiAxios = axios.create({
    baseURL: "https://kubernetes.docker.internal",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiAxios;
