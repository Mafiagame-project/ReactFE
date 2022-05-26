// 개발 모드 확인
export const logger = (msg) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }
}

// 토큰 가져오기
export const getToken = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    return `Bearer ${token}`
  } else {
    return null
  }
}
