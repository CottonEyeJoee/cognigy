import { cleanup, render } from '@testing-library/react'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'

import { Loading } from './Loading'
import { getDesignTokens } from 'theme'

const theme = createTheme(getDesignTokens('light'))

describe('TitleBar', () => {
	afterEach(cleanup)
	it('render', () => {
		const { asFragment } = render(
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Loading />
				</ThemeProvider>
			</StyledEngineProvider>,
		)
		expect(asFragment()).toMatchSnapshot()
	})
})
