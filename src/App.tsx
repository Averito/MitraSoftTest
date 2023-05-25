import { Route, Routes } from 'react-router-dom'

import { Home } from '@pages/home'
import { User } from '@pages/user'

export const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/users/:id' element={<User />} />
		</Routes>
	)
}
