import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// import reducer from './reducers'
// import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({})

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type RootDispatch = ReturnType<typeof store.dispatch>
