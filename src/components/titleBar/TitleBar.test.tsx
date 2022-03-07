import { cleanup, render } from '@testing-library/react'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'

import { TitleBar } from './TitleBar'
import { getDesignTokens } from 'theme'

const theme = createTheme(getDesignTokens('light'))

describe('TitleBar', () => {
	afterEach(cleanup)
	it('render', () => {
		const { asFragment } = render(
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<TitleBar onThemeChange={() => {}} />
				</ThemeProvider>
			</StyledEngineProvider>,
		)
		expect(asFragment()).toMatchSnapshot()
	})
})
