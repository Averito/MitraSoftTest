import { Route, Routes } from 'react-router-dom'

import { Home } from '@pages/home'
import { User } from '@pages/user'
import { Me } from '@pages/me'

export const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/users/:id' element={<User />} />
			<Route path='/me' element={<Me />} />
		</Routes>
	)
}
