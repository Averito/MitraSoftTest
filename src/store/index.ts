import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { mainReducer } from '@store/reducers/mainReducer/main.reducer.ts'
import { userReducer } from '@store/reducers/userReducer/user.reducer.ts'
import mainWatcherSaga from '@store/sagas/main.saga.ts'
import userWatcherSaga from '@store/sagas/user.saga.ts'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
	main: mainReducer,
	user: userReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(mainWatcherSaga)
sagaMiddleware.run(userWatcherSaga)

export type RootState = ReturnType<typeof rootReducer>
