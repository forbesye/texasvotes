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

// LRU cache to store API requests
const apiCache = new cache()

/**
 * API client from axios, allows modularity across models and is configured to
 * be linked to our back-end API, now with caching!
 * @param {model, path, params} elements
 */
const getAPI = async ({ model, path, params }) => {
	const url = path ? `/${model}/${path}` : `/${model}`
	const config = params ? { params: params } : {}
	const hash = `${url}${config?.params.toString()}`
	return (
		checkCache(hash) || getData(url, config, hash)
	)
}

/**
 * Async function to get data from API, called if no data in cache
 * @param {String} url 
 * @param {Axios.config} config 
 * @param {String} hash 
 */
const getData = async (url, config, hash) => {
	const { data } = await client.get(url, config)
	apiCache.set(hash, data)
	return data
}

/**
 * Sync function to get data from cache
 * @param {string} hash 
 */
const checkCache = (hash) => {
	if(!apiCache.has(hash)) {
		return null
	}
	return apiCache.get(hash)
}

export { getAPI }
