import React from 'react';
import { SocketClient } from '@cognigy/socket-client';
import { useSelector } from 'react-redux';
import { getMessage, selectChat } from './chatSlice';

const Chat: React.FC = (): JSX.Element => {
	const history = useSelector(selectChat);
	React.useEffect(() => {
		const websocket = new SocketClient(
			'https://endpoint-trial.cognigy.ai',
			'c62c5fbea632152a4e3265f21862b91e21eacca1f135a1a07b031a0c6f5c6274',
			{ forceWebsockets: true }
		);

		websocket.on('output', output => {
			getMessage(output);
			console.log('Text: ' + output.text + '   Data: ' + output.data);
		});

		async () => await websocket.connect();
		websocket.sendMessage('hello there');
		websocket.sendMessage('hello there', { color: 'green' });
		websocket.sendMessage('', { color: 'green' });
	}, []);
	console.log('history', history);
	return <div>Chat</div>;
};

export default Chat;
