import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { mainReducer } from '@store/reducers/mainReducer/main.reducer.ts'
import mainWatcherSaga from '@store/sagas/main.saga.ts'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
	main: mainReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(mainWatcherSaga)

export type RootState = ReturnType<typeof rootReducer>
