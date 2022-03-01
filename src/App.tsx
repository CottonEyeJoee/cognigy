import { Typography } from '@mui/material';
import Chat from './store/features/chat/Chat';

export default function App() {
	return (
		<>
			<Typography variant='h1' sx={{ textAlign: 'center' }} gutterBottom>
				Chatbot
			</Typography>
			<Chat />
		</>
	);
}
