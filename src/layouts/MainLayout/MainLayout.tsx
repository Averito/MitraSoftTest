import { FC, PropsWithChildren } from 'react'

import styles from './MainLayot.module.scss'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>{children}</div>
		</div>
	)
}
