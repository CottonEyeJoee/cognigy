import React from 'react';
import { SocketClient } from '@cognigy/socket-client';
import { Chat } from './components/Chat';
import { UserInputField } from 'components/UserInputField';
import { TitleBar } from 'components/TitleBar';
import { useAppDispatch } from 'redux/hooks';
import {
	postMessage,
	getMessage,
	Origin,
	Reply,
} from 'redux/features/chatSlice';
import {
	Alert,
	createTheme,
	CssBaseline,
	Grid,
	Paper,
	Snackbar,
	styled,
	ThemeProvider,
} from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';

enum TypingStatus {
	active = 'typingOn',
	inactive = 'typingOff',
}

enum GeneralStatus {
	Loading = 'loading',
	Idle = 'idle',
	Error = 'error',
}

export const App: React.FC = (): JSX.Element => {
	const webSocket = React.useRef<SocketClient | null>(null);
	const [generalStatus, setGeneralStatus] = React.useState<GeneralStatus>(
		GeneralStatus.Loading
	);
	const [isBotActive, setIsBotActive] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	const theme = createTheme({
		palette: {
			common: {
				white: 'hsl(200, 23.1%, 94.9%)', // lightBlue
			},
			primary: {
				main: 'hsl(221.2, 86.2%, 31.2%)', // darkSlateBlue
				contrastText: 'hsl(200, 23.1%, 94.9%)', // white
			},
			secondary: {
				main: 'hsl(210, 3%, 88%)', // ironGrey
				contrastText: 'hsl(221.2, 86.2%, 31.2%)', // darkSlateBlue
			},
		},
		typography: {
			fontSize: 14,
		},
	});

	const idGenerator = (): string => Math.random().toString(16).slice(2);

	React.useEffect(() => {
		webSocket.current = new SocketClient(
			process.env.API_ENDPOINT_URI!,
			process.env.API_TOKEN!
		);

		(async () => {
			await webSocket?.current?.connect();
			setGeneralStatus(GeneralStatus.Idle);
			sendMessage('where I come from we say "moin moin!"');
			sendMessage('cat image');
		})();

		webSocket.current.on('output', (output: Reply): void => {
			dispatch(getMessage({ ...output, traceId: idGenerator() })); // silly because the first 2 messages from the bot have the same traceId
		});
		webSocket.current.on(
			'typingStatus',
			({ status }: { status: TypingStatus }): void => {
				setIsBotActive(status === TypingStatus.active ? true : false);
			}
		);
		webSocket.current.on('error', error => {
			console.error(error);
			setGeneralStatus(GeneralStatus.Error);
		});
		return () => {
			webSocket?.current?.disconnect();
		};
	}, []);

	const sendMessage = (text: string): void => {
		webSocket.current && webSocket.current.sendMessage(text);
		dispatch(
			postMessage({
				origin: Origin.User,
				text,
				data: {},
				id: idGenerator(),
			})
		);
	};

	const StyledPaper = styled(Paper)(({ theme }) => ({
		width: '100vh',
		maxWidth: 375,
		height: '100vh',
		maxHeight: 667,
		backgroundColor: theme.palette.common.white,
	}));

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
						<TitleBar />
					</Grid>
					<Grid
						item
						xs
						sx={{
							display: 'grid',
							placeItems: 'center',
							width: '100%',
							flexGrow: 1,
							overflowY: 'auto',
						}}>
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
	);
};
