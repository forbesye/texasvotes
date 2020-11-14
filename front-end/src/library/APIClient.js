import axios from "axios"

/**
 * Configures an axios client to link to our back-end API using env. var.
 */
const api_url = process.env.REACT_APP_API_URL
	? process.env.REACT_APP_API_URL
	: "https://apidev.texasvotes.me"

const client = axios.create({
	baseURL: api_url,
})

/**
 * API client from axios, allows modularity across models and is configured to
 * be linked to our back-end API
 * @param {model, path, params} elements
 */
const getAPI = async ({ model, path, params }) => {
	let url = path ? `/${model}/${path}` : `/${model}`
	const config = params ? { params: params } : {}
	const result = await client.get(url, config)
	return result.data
}

export { getAPI }
