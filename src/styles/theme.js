//전체 디자인 색상, 폰트 관리 페이지 입니다.
import { css } from 'styled-components'

const color = {
  white: '#fff',
  black: '#292b2d',
  purple: '#B92AFC',
  mint: '#A5FFDE',
  yellow: '#FFF170',
  pink: '#FF689E',
  gray: '#F6F6F6',
  darkGray: '#c4c4c4',
}

//미디어쿼리 모듈화 참고: https://wonit.tistory.com/367
const deviceSizes = {
  mobile: 390,
  tablet: 798,
  pc: 1080,
}

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile - 1}px)`,

  tablet: `screen and (max-width: ${deviceSizes.tablet - 1}px)`,

  pc: `screen and (max-width: ${deviceSizes.pc - 1}px)`,
}

const theme = {
  color,
  device,
}

export default theme
