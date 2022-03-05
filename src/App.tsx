import React from 'react'
import { SocketClient } from '@cognigy/socket-client'
import { useAppDispatch } from 'redux/hooks'
import {
	Alert,
	createTheme,
	CssBaseline,
	Grid,
	PaletteMode,
	Snackbar,
	ThemeProvider,
	useMediaQuery,
} from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'

import { postMessage, getMessage } from 'redux/features/chatSlice'
import { TitleBar, Chat, UserInputField } from 'components'
import { StyledGrid, StyledPaper } from 'App.styles'
import { GeneralStatus, TypingStatus, Origin, Reply } from 'interfaces'
import { getDesignTokens } from 'styles/theme'
import { idGenerator } from 'utils'

export const App: React.FC = (): JSX.Element => {
	const webSocket = React.useRef<SocketClient | null>(null)
	const [generalStatus, setGeneralStatus] = React.useState<GeneralStatus>(
		GeneralStatus.Loading,
	)
	const [isBotActive, setIsBotActive] = React.useState<boolean>(false)
	const [themeMode, setThemeMode] = React.useState<PaletteMode>('light')
	const dispatch = useAppDispatch()

	const onThemeChange = React.useCallback(() => {
		setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
	}, [themeMode])

	const theme = React.useMemo(
		() => createTheme(getDesignTokens(themeMode)),
		[themeMode],
	)

	React.useEffect(() => {
		webSocket.current = new SocketClient(
			process.env.API_ENDPOINT_URI!,
			process.env.API_TOKEN!,
		)
		;(async () => {
			await webSocket?.current?.connect()
			setGeneralStatus(GeneralStatus.Idle)
			sendMessage('where I come from we say "moin moin!"')
			sendMessage('cat image')
		})()

		webSocket.current.on('output', (output: Reply): void => {
			dispatch(getMessage({ ...output, traceId: idGenerator() })) // silly because the first 2 messages from the bot have the same traceId
		})
		webSocket.current.on(
			'typingStatus',
			({ status }: { status: TypingStatus }): void => {
				setIsBotActive(status === TypingStatus.active ? true : false)
			},
		)
		webSocket.current.on('error', error => {
			console.error(error)
			setGeneralStatus(GeneralStatus.Error)
		})
		return () => {
			webSocket?.current?.disconnect()
		}
	}, [])

	const sendMessage = (text: string): void => {
		webSocket.current && webSocket.current.sendMessage(text)
		dispatch(
			postMessage({
				origin: Origin.User,
				text,
				data: {},
				id: idGenerator(),
			}),
		)
	}

	return (
		<ThemeProvider theme={theme}>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={generalStatus === GeneralStatus.Error}
				TransitionComponent={(props: SlideProps) => (
					<Slide {...props} direction='down' />
				)}
				key={'error'}>
				<Alert variant='filled' severity='error'>
					{/* never happens, but if the user should know that, i have no idea either 🤷 */}
					Oops - something went wrong
				</Alert>
			</Snackbar>
			<StyledPaper>
				<Grid container direction='column' sx={{ height: '100%' }}>
					<Grid item xs='auto'>
						<TitleBar
							onThemeChange={onThemeChange}
							isDarkMode={themeMode === 'dark'}
						/>
					</Grid>
					<StyledGrid item xs>
						<Chat
							isBotActive={isBotActive}
							isLoading={generalStatus === GeneralStatus.Loading}
						/>
					</StyledGrid>
					<Grid item xs='auto'>
						<UserInputField sendMessage={sendMessage} />
					</Grid>
				</Grid>
			</StyledPaper>
			<CssBaseline />
		</ThemeProvider>
	)
}
