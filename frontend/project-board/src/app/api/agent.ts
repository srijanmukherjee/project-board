import axios, { AxiosResponse } from "axios"
import { store } from "../store/configureStore";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

axios.interceptors.request.use((config) => {
	const token = store.getState().account?.jwt;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
	post: (url: string, body: object) => axios.post(url, body).then(responseBody)

}

const Project = {
	fetchAll: (params?: URLSearchParams) => requests.get('projects', params)
}

const Account = {
	login: (username: string, password: string) => requests.post('auth/login', {
		username, password
	})
}

export const agent = {
	Project, Account
}