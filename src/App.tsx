import React from 'react'
import { SocketClient } from '@cognigy/socket-client'
import { useAppDispatch } from 'redux/hooks'
import {
	createTheme,
	CssBaseline,
	Grid,
	PaletteMode,
	ThemeProvider,
} from '@mui/material'

import { postMessage, getMessage } from 'redux/features/chatSlice'
import { TitleBar, Chat, UserInputField, Alert } from 'components'
import { StyledPaper } from 'App.styles'
import {
	GeneralStatus,
	TypingStatus,
	Origin,
	Reply,
	ThemeMode,
} from 'interfaces'
import { getDesignTokens } from 'theme'
import { idGenerator } from 'utils'

export const App: React.FC = (): JSX.Element => {
	const webSocket = React.useRef<SocketClient | null>(null)
	const [generalStatus, setGeneralStatus] = React.useState<GeneralStatus>(
		GeneralStatus.Loading,
	)
	const [isBotActive, setIsBotActive] = React.useState<boolean>(false)
	const [themeMode, setThemeMode] = React.useState<PaletteMode>(ThemeMode.Light)
	const dispatch = useAppDispatch()

	const onThemeChange = React.useCallback(() => {
		setThemeMode(
			themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark,
		)
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
			<StyledPaper>
				<Alert
					isOpen={generalStatus === GeneralStatus.Error}
					// never happens, but if the user should know that, i have no idea either 🤷
					text='Oops - something went wrong'
				/>
				<Grid container direction='column' sx={{ height: '100%' }}>
					<Grid item xs='auto'>
						<TitleBar onThemeChange={onThemeChange} />
					</Grid>
					<Grid item xs sx={{ overflowY: 'auto' }}>
						<Chat
							isBotActive={isBotActive}
							isLoading={generalStatus === GeneralStatus.Loading}
						/>
					</Grid>
					<Grid item xs='auto'>
						<UserInputField sendMessage={sendMessage} />
					</Grid>
				</Grid>
			</StyledPaper>
			<CssBaseline />
		</ThemeProvider>
	)
}
