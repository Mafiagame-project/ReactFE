//kakao
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY

const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

//naver
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
const NAVER_CALLBACK_URI = 'https://mafiyang.com/naverLogin/callback'

const randomString = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
  const stringLength = 6
  let randomstring = ''
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length)
    randomstring += chars.substring(rnum, rnum + 1)
  }
  return randomstring
}
const newState = randomString()

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URI}&state=${newState}`
