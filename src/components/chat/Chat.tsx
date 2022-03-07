import React from 'react'
import { Fade, Stack, Typography } from '@mui/material'

import { useAppSelector } from 'redux/hooks'
import { selectChat } from 'redux/features/chatSlice'
import { ChatWindow } from './Chat.styles'
import { Message, Loading } from 'components'

interface Props {
	isBotActive: boolean
	isLoading: boolean
}

export const Chat: React.FC<Props> = ({
	isBotActive,
	isLoading,
}): JSX.Element => {
	const history = useAppSelector(selectChat)

	// the app is too fast for the user to actually see it, but it's a good feeling to know it's there, just in case you know
	if (isLoading) return <Loading />

	return (
		<ChatWindow>
			<Stack spacing={1}>
				{history.map(props => (
					<Message key={props.id} {...props} />
				))}
			</Stack>
			<Fade in={isBotActive}>
				<Typography variant='caption'>Bot is typing...</Typography>
			</Fade>
		</ChatWindow>
	)
}
