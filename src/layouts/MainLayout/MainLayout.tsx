import { FC, PropsWithChildren } from 'react'

import styles from './MainLayot.module.scss'
import { Header } from '@layouts/MainLayout/components/header'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>{children}</div>
			</div>
		</>
	)
}
