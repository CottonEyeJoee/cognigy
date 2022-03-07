import { cleanup, render } from '@testing-library/react'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'

import { UserInputField } from './UserInputField'
import { getDesignTokens } from 'theme'

const theme = createTheme(getDesignTokens('light'))

describe('UserInputField', () => {
	afterEach(cleanup)
	it('render', () => {
		const { asFragment } = render(
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<UserInputField sendMessage={() => {}} />
				</ThemeProvider>
			</StyledEngineProvider>,
		)
		expect(asFragment()).toMatchSnapshot()
	})
})
