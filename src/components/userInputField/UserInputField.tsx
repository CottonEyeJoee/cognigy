import React, { ChangeEvent } from 'react'
import { Paper, Button, Grid, TextField, Tooltip } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

interface Props {
	sendMessage: (text: string) => void
}

export const UserInputField: React.FC<Props> = ({
	sendMessage,
}): JSX.Element => {
	const [message, setMessage] = React.useState<string>('')

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value)
	}

	const onEnterPress = (event: React.KeyboardEvent): void => {
		if (event.code === 'Enter' && message.length) {
			sendMessage(message)
			setMessage('')
		}
	}

	const onButtonClick = (): void => {
		if (message.length) {
			sendMessage(message)
			setMessage('')
		}
	}

	return (
		<Paper variant='outlined' square>
			<Grid p={1} container spacing={0.5}>
				<Grid item xs>
					<TextField
						variant='standard'
						fullWidth
						autoFocus
						onChange={handleChange}
						value={message}
						onKeyPress={onEnterPress}
					/>
				</Grid>
				<Grid item xs='auto'>
					<Tooltip title='Send' placement='top'>
						<Button onClick={onButtonClick}>
							<SendIcon />
						</Button>
					</Tooltip>
				</Grid>
			</Grid>
		</Paper>
	)
}
