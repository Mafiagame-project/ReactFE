import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './theme'

const GlobalThemeProvider = ({ children }) => {
  return <ThemeProvider theme={{ ...theme }}></ThemeProvider>
}

export default GlobalThemeProvider
