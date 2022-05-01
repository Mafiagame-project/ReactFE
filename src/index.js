import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './shared/App'
import reportWebVitals from './reportWebVitals'
import store from './redux/configureStore'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister()

registerServiceWorker()
