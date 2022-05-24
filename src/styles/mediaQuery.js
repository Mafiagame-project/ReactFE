import React from 'react'
import MediaQuery from 'react-responsive'
import { useMediaQuery } from 'react-responsive'

export const DeskTop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1440 })
  return isDesktop ? children : null
}

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1339 })
  return isTablet ? children : null
}

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 356, maxWidth: 767 })
  return isMobile ? children : null
}
