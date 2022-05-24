//kakao
const REST_API_KEY = '6c9c16d27b420108ed23421696dfba3b'
const REDIRECT_URI = 'https://www.mafiyang.com/main'
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

//naver
const NAVER_CLIENT_ID = '9WNFXnar7frmNNTQmP4N'
const NAVER_CALLBACK_URI = 'http://localhost:3000/naverLogin/main'

const state = Math.random().toString(36).substring(2, 11)

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URI}&state=${state}`
