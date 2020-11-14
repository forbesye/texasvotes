import Axios from "axios"
import LRU from "lru-cache"
import { configure, makeUseAxios } from "axios-hooks"

/**
 * Configures an axios client to link to our back-end API using env. var.
 */
const axios = Axios.create({
	baseURL: process.env.REACT_APP_API_URL
	? process.env.REACT_APP_API_URL
	: "https://apidev.texasvotes.me",
})
const cache = new LRU({ max: 10 })
const useAxios = makeUseAxios({ cache, axios })

/**
 * API client from axios, allows modularity across models and is configured to
 * be linked to our back-end API
 * @param {model, path, params} elements
 */
const useAxiosHook = ({ model, path, params }) => {
	const url = path ? `/${model}/${path}` : `/${model}`
	const config = params ? { params: params } : {}
	return useAxios({
		url: url, 
		params: config
	},
	{ useCache: true })
}

const getAPI = async ({ model, path, params }) => {
	let url = path ? `/${model}/${path}` : `/${model}`
	const config = params ? { params: params } : {}
	const result = await axios.get(url, config)
	return result.data
}

export default useAxiosHook
export { getAPI }
