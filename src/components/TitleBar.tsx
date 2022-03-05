import React from 'react'
import { Typography, Stack } from '@mui/material'
import MinimizeIcon from '@mui/icons-material/Minimize'
import CloseIcon from '@mui/icons-material/Close'

import { Bar } from 'styles/TitleBar.styles'
import { ThemeSwitch } from 'components/ThemeSwitch'

interface Props {
	onThemeChange: () => void
	isDarkMode: boolean
}

export const TitleBar: React.FC<Props> = ({ onThemeChange }): JSX.Element => {
	return (
		<Bar elevation={2} variant='outlined' square>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				spacing={2}>
				<Typography variant='h1' component='h1' sx={{ flexGrow: 1 }}>
					Chatbot
				</Typography>
				{/* <Stack direction='row' spacing={1}>
					<MinimizeIcon />
					<CloseIcon />
				</Stack> */}
				<ThemeSwitch onThemeChange={onThemeChange} />
			</Stack>
		</Bar>
	)
}
