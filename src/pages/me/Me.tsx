import { FC } from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { Card } from 'react-bootstrap'

export const Me: FC = () => {
	return (
		<MainLayout>
			<Card>
				<Card.Title className='p-2'>Бойко Максим Дмитриевич</Card.Title>
				<Card.Text className='p-2'>
					Я занимаюсь Frontend-разработкой уже около 2ух лет, а если душнить, то
					1 год и 7 месяцев)) Пробовал себя в разных направлениях, как мобильная
					разработка (Flutter, React Native), так и бэкенд (Node.js, C#). В
					данный момент наибольший интерес вызывает именно Frontend т.к. тут я
					могу воплощать свои идеи в реальность :D Особенно люблю сложные
					задачи, а если они связаны с WebRTC, 3д или ещё с чем-то экзотичным,
					то это моя мечта))
					<br />
					Github:{' '}
					<a href='https://github.com/Averito'>https://github.com/Averito</a>
				</Card.Text>
			</Card>
		</MainLayout>
	)
}
