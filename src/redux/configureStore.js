import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import User from './modules/user'
import Game from './modules/game'
import Room from './modules/room'
import Member from './modules/member'
import socket from './modules/socket'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  user: User,
  room: Room,
  game: Game,
  member: Member,
  socket: socket,
  router: connectRouter(history),
})

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ['socket'],
  // blacklist -> 그것만 제외합니다
}

const middlewares = [thunk.withExtraArgument({ history })]

// // 개발 환경일때, redux-logger 사용할 수 있게하기
const env = process.env.NODE_ENV
if (env === 'development') {
  // const { logger } = require('redux-logger')
  // middlewares.push(logger)
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))
let store = (initialStore) => createStore(rootReducer, enhancer)

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistConfig, store)

export default persistedReducer()
