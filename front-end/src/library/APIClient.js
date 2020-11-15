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
 * Generates hash from url and params
 * @param {string, params} props 
 */
const getHash = ({url, config}) => {
	return `${url}${config?.params.toString()}`
}

/**
 * API client from axios, allows modularity across models and is configured to
 * be linked to our back-end API, and caches result!
 * @param {model, path, params} elements
 */
const getAPI = async ({ model, path, params }) => {
	const url = path ? `/${model}/${path}` : `/${model}`
	const config = params ? { params: params } : {}
	const hash = getHash({url, config})
	const { data } = await client.get(url, config)
	apiCache.set(hash, data)
	return data
}

/**
 * Sync function to get data from cache
 * @param {model, path, params} elements 
 */
const checkCache = ({model, path, params}) => {
	const url = path ? `/${model}/${path}` : `/${model}`
	const config = params ? { params: params } : {}
	const hash = getHash({url, config})
	if(!apiCache.has(hash)) {
		return null
	}
	return apiCache.get(hash)
}

export { getAPI, checkCache }
