import { FC } from 'react'
import { Navbar, Offcanvas, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import defaultAvatar from '@/assets/images/defaultAvatar.png'

export const Header: FC = () => {
	return (
		<Navbar bg='light' expand={false} className='mb-3'>
			<Container fluid>
				<Navbar.Offcanvas placement='start'>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>
							<div>
								<img
									className='m-2'
									src={defaultAvatar}
									width={32}
									height={32}
									alt='Нет аватарки('
								/>
								Бойко Максим
							</div>
							<a className='fs-6' href='mailto:avenantmar@gmail.com'>
								avenantmar@gmail.com
							</a>
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className='justify-content-end flex-grow-1 pe-3'>
							<Link to='/'>Список постов</Link>
							<Link to='/me'>Обо мне</Link>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
				<Navbar.Toggle />
			</Container>
		</Navbar>
	)
}
