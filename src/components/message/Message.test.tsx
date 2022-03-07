import { cleanup, render } from '@testing-library/react'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'

import { Message } from './Message'
import { getDesignTokens } from 'theme'
import { Origin } from 'interfaces'

const theme = createTheme(getDesignTokens('light'))

describe('TitleBar', () => {
	afterEach(cleanup)
	it('render', () => {
		const { asFragment } = render(
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Message origin={Origin.User} text='test' data={{}} />
				</ThemeProvider>
			</StyledEngineProvider>,
		)
		expect(asFragment()).toMatchSnapshot()
	})
})
