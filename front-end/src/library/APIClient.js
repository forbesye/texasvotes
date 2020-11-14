import axios from "axios"
import cache from "lru-cache"

/**
 * Configures an axios client to link to our back-end API using env. var.
 */
const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL
	? process.env.REACT_APP_API_URL
	: "https://apidev.texasvotes.me"
})
const apiCache = new cache()
/**
 * API client from axios, allows modularity across models and is configured to
 * be linked to our back-end API
 * @param {model, path, params} elements
 */
const getAPI = async ({ model, path, params }) => {
	const url = path ? `/${model}/${path}` : `/${model}`
	const config = params ? { params: params } : {}
	const hash = `${url}${config?.params.toString()}`
	if(apiCache.has(hash)) {
		return apiCache.get(hash)
	}
	else {
		const result = await client.get(url, config)
		const { data } = result
		apiCache.set(hash, data)
		return data
	}
}

export { getAPI }
