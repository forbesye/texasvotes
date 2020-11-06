import axios from "library/AxiosConfig.js"

/**
 * API client from axios, allows modularity across models and is configured to
 * be linked to our back-end API
 * @param {model, path, params} elements 
 */
const getAPI = async ({ model, path, params }) => {
	let url = path ? `/${model}/${path}` : `/${model}`
	const config = params ? { params: params } : {}
	const result = await axios.get(url, config)
	return result.data
}

export { getAPI }
