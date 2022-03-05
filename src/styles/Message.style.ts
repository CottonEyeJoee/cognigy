import { Box, Paper, styled } from '@mui/material'

import { Origin } from 'interfaces'

interface MessageBubbleProps {
	origin: Origin
}

export const MessageBubble = styled(Paper, {
	shouldForwardProp: prop => prop !== 'origin',
})<MessageBubbleProps>(({ theme, origin }) => ({
	maxWidth: '90%',
	color:
		origin === Origin.User
			? theme.palette.text.primary
			: theme.palette.text.secondary,
	backgroundColor:
		origin === Origin.User
			? theme.palette.primary.main
			: theme.palette.secondary.main,
	alignSelf: origin === Origin.User ? 'end' : 'start',
}))

export const MessageText = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1),
}))

export const MessageImage = styled('img')(({ theme }) => ({
	display: 'block',
	width: '100%',
}))
