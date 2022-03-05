import { Box, styled } from '@mui/material'

export const ChatWindow = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	width: '100%',
	height: '100%',
	padding: theme.spacing(1),
}))

interface TypingStatusProps {
	isBotActive: boolean
}

export const TypingStatus = styled(Box, {
	shouldForwardProp: prop => prop !== 'isBotActive',
})<TypingStatusProps>(({ theme, isBotActive }) => ({
	display: isBotActive ? 'display' : 'none',
}))
