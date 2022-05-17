import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators as userAction } from '../redux/modules/user'
import naver from '../assets/icons/social/naver.png'

const NaverLogin = () => {
  const dispatch = useDispatch()

  let code = new URL(window.location.href).searchParams.get('code')
  let state = new URL(window.location.href).searchParams.get('state')

  React.useEffect(() => {
    dispatch(userAction.naverLogin(code, state))
  })

  return null
}

export default NaverLogin

// function NaverLogin() {
//   const dispatch = useDispatch()
//   const naverRef = React.useRef()
//   const { naver } = window

//   const Login = () => {
//     Naver()
//     UserProfile()
//   }

//   React.useEffect(Login, [])

//   function Naver() {
//     const naverLogin = new naver.LoginWithNaverId({
//       clientId: '9WNFXnar7frmNNTQmP4N',
//       callbackUrl: 'http://localhost:3000/naverLogin/main',
//       isPopup: false, // popup 형식으로 띄울것인지 설정
//       loginButton: { color: 'green', type: 1, height: '60' }, //버튼의 스타일, 타입, 크기를 지정
//     })
//     naverLogin.init()
//   }

//   const UserProfile = () => {
//     window.location.href.includes('access_token') && GetUser()
//     function GetUser() {
//       const location = window.location.href.split('=')[1]
//       const token = location.split('&')[0]
//       console.log('token: ', token)
//       dispatch(userAction.naverLogin(token))
//     }
//   }

//   return (
//     <>
//       <div ref={naverRef} id="naverIdLogin" onClick={Login}></div>
//       {/* <button onClick={Login} className="naver">
//         <img src={naver} />
//       </button> */}
//     </>
//   )
// }

// export default NaverLogin
