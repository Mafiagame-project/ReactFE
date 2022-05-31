import { useMediaQuery } from 'react-responsive'

export const Desktop = (props) => {
  const { children } = props
  const isDesktop = useMediaQuery({ minWidth: 1440 })
  return isDesktop ? children : null
}

export const Tablet = (props) => {
  const { children } = props
  const isTablet = useMediaQuery({ minWidth: 500, maxWidth: 1339 })
  return isTablet ? children : null
}

export const Mobile = (props) => {
  const { children } = props
  const isMobile = useMediaQuery({ minWidth: 356, maxWidth: 499 })
  return isMobile ? children : null
}
