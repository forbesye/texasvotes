import axios from "library/AxiosConfig.js"

const getAPI = async ({ model, path, params }) => {
    let url = path ? `/${model}/${path}` : `/${model}`
    const config = params ? { params: params } : {}
    const result = await axios.get(url, config);
    return result.data;
}

export {
    getAPI
}