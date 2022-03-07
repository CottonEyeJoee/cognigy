import { cleanup, render } from '@testing-library/react'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'

import { Chat } from './Chat'
import { getDesignTokens } from 'theme'

const theme = createTheme(getDesignTokens('light'))

describe('Chat', () => {
	afterEach(cleanup)
	it('render', () => {
		const { asFragment } = render(
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Chat isBotActive={false} isLoading={false} />
				</ThemeProvider>
			</StyledEngineProvider>,
		)
		expect(asFragment()).toMatchSnapshot()
	})
})
