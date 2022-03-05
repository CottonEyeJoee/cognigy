import { PaletteMode } from '@mui/material'

const COLORS = {
	light: {
		blue: 'hsl(221, 86%, 31%)',
		grey: 'hsl(210, 3%, 88%)',
		white: 'hsl(200, 23%, 95%)',
		red: 'hsl(342, 89%, 48%)',
	},
	dark: {
		blue: 'hsl(217, 100%, 28.6%)',
		grey: 'hsl(210, 3%, 68%)',
		black: 'hsl(204, 28%, 7%)',
		red: 'hsl(342, 89%, 38%)',
	},
}

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					text: {
						primary: COLORS.light.white,
						secondary: COLORS.light.blue,
					},
					primary: {
						main: COLORS.light.blue,
					},
					secondary: {
						main: COLORS.light.grey,
					},
					background: {
						paper: COLORS.light.white,
					},
					error: {
						main: COLORS.light.red,
					},
			  }
			: {
					// palette values for dark mode
					text: {
						primary: COLORS.dark.grey,
						secondary: COLORS.dark.grey,
					},
					primary: {
						main: COLORS.dark.blue,
					},
					secondary: {
						main: COLORS.dark.black,
					},
					background: {
						paper: COLORS.dark.black,
					},
			  }),
	},
	typography: {
		fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
		fontSize: 14,
		h1: {
			fontWeight: 400,
			fontSize: '1.2em',
		},
	},
})
