import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './shared/App'
import store from './redux/configureStore'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import Theme from './styles/theme'

const container = document.getElementById('root')
const persistor = persistStore(store)
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister()
