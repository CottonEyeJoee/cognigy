import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

import { useAppSelector } from 'redux/hooks'
import { selectChat } from 'redux/features/chatSlice'
import { ChatWindow, TypingStatus } from 'styles/Chat.styles'
import { Message } from 'components/Message'

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
	if (isLoading) return <CircularProgress sx={{ margin: 'auto' }} />

	return (
		<ChatWindow>
			<Stack spacing={1}>
				{history.map(props => (
					<Message key={props.id} {...props} />
				))}
			</Stack>
			<TypingStatus isBotActive={isBotActive}>Bot is typing...</TypingStatus>
		</ChatWindow>
	)
}
