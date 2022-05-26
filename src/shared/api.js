import axios from 'axios'
import { getToken } from './utils'

//동선님 서버
const BASE_URL = process.env.REACT_APP_BASE_URL
// https://nhseung.shop

const api = axios.create({
  url: BASE_URL,
})

api.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Accept'] = '*/*'
  config.headers['authorization'] = getToken()
  return config
})

export const apis = {
  // user
  login: (userInfo) => api.post('/user/login', userInfo),
  signup: (userInfo) => api.post('/user/register', userInfo),
  logOut: (user) => api.get('/user/logout', user),
  checkId: (id) => api.post('/user/idCheck', { idCheck: id }),
  checkEmail: (email) => api.post('/user/emailCheck', email),
  checkNick: (nick) => api.post('/user/nickCheck', nick),
  findPw: (pwInfo) => api.post('/user/findPw', pwInfo),
  changePw: (pwInfo) => api.post('user/changePw', pwInfo),
  changeNick: (changeNick) => api.post('user/changeNick', changeNick),

  naverCode: (code, state) =>
    api.get(`/naverLogin/main?code=${code}&state=${state}`),
  kakaoCode: (code) => api.get(`/main?code=${code}`),
  addFriend: (friendUserId) => api.post('/user/friendAdd', friendUserId),
  getFriend: () => api.post('/user/friendList'),
  deleteFriend: (id) => api.post('/user/friendRemove', id),
}

export default apis
