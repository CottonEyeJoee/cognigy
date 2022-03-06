import React from 'react'
import { Alert as MaterialAlert, Snackbar } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'

interface Props {
	open: boolean
	text: string
}

export const Alert: React.FC<Props> = ({ open, text }): JSX.Element => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={open}
			TransitionComponent={(props: SlideProps) => (
				<Slide {...props} direction='down' />
			)}
			key={'error'}>
			<MaterialAlert variant='filled' severity='error'>
				{text}
			</MaterialAlert>
		</Snackbar>
	)
}
