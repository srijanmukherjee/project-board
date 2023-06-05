import axios, { AxiosResponse } from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody)
}

const Project = {
	fetchAll: (params?: URLSearchParams) => requests.get('projects', params)
}

export const agent = {
	Project
}