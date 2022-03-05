import { Grid, Paper, styled } from '@mui/material'

export const StyledPaper = styled(Paper)(() => ({
	width: '100vh',
	maxWidth: 375,
	height: '100vh',
	maxHeight: 667,
}))

export const StyledGrid = styled(Grid)(() => ({
	display: 'grid',
	placeItems: 'center',
	width: '100%',
	flexGrow: 1,
	overflowY: 'auto',
}))
