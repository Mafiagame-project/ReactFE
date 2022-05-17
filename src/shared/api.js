import axios from 'axios'
import { getToken } from './utils'

const BASE_URL = 'https://sparta-dongsun.shop'
//http://3.36.75.6/

const api = axios.create({
  BASE_URL: 'https://sparta-dongsun.shop',
})

api.interceptors.request.use(async (config) => {
  config.headers['content-type'] = 'application/json; charset=utf-8'
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Accept'] = '*/*'
  config.headers['authorization'] = await getToken()
  return config
})

// const naverHeader = {
//   headers: {
//     'Content-type': 'application/json',
//     Authorization: token,
//   },
// }

export const Api = {
  getNaverCode: (code, state) =>
    Api.get(`/naverLogin/main?code=${code}&state=${state}`),
}
