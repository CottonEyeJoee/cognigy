import { Paper, styled } from '@mui/material'

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
			? theme.palette.primary.contrastText
			: theme.palette.secondary.contrastText,
	backgroundColor:
		origin === Origin.User
			? theme.palette.primary.main
			: theme.palette.secondary.main,
	alignSelf: origin === Origin.User ? 'end' : 'start',
	overflow: 'hidden',
}))

export const MessageImage = styled('img')(() => ({
	display: 'block',
	width: '100%',
	maxHeight: 320,
	objectFit: 'cover',
}))
