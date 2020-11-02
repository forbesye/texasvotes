import axios from "axios"

const api_url = process.env.REACT_APP_API_URL
	? process.env.REACT_APP_API_URL
	: "https://apidev.texasvotes.me"

const client = axios.create({
	baseURL: api_url,
})

export default client
