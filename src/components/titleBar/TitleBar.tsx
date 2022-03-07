import React from 'react'
import { Typography, Stack } from '@mui/material'

import { ThemeSwitch } from 'components'
import { Bar } from './TitleBar.styles'

interface Props {
	onThemeChange: () => void
}

export const TitleBar: React.FC<Props> = ({ onThemeChange }): JSX.Element => {
	return (
		<Bar variant='outlined' square>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				spacing={2}>
				<Typography variant='h1' component='h1'>
					Chatbot
				</Typography>
				<ThemeSwitch onThemeChange={onThemeChange} />
			</Stack>
		</Bar>
	)
}
