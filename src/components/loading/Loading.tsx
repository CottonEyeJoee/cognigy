import React from 'react'
import { CircularProgress } from '@mui/material'

import { Backdrop } from './Loading.styles'

export const Loading: React.FC = (): JSX.Element => {
	return (
		<Backdrop>
			<CircularProgress />
		</Backdrop>
	)
}
