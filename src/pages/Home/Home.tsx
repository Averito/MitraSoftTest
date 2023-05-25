import { FC } from 'react'
import { Button } from 'react-bootstrap'
import { MainLayout } from '@layouts/MainLayout'

export const Home: FC = () => {
	return (
		<MainLayout>
			{' '}
			<Button variant='outline-primary'>Click me!</Button>
		</MainLayout>
	)
}
