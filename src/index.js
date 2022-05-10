import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './shared/App'
import store from './redux/configureStore'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import Theme from './styles/theme'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </Provider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister()
