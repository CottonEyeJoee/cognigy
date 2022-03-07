import { Box, styled } from '@mui/material'

export const ChatWindow = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	width: '100%',
	height: '100%',
	padding: theme.spacing(1),
}))
