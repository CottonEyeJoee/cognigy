import React, { useRef } from 'react';
import { SocketClient } from '@cognigy/socket-client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getMessage, selectChat } from './chatSlice';

const Chat: React.FC = (): JSX.Element => {
	const webSocket = useRef<SocketClient | null>(null);
	const history = useAppSelector(selectChat);

	React.useEffect(() => {
		webSocket.current = new SocketClient(
			process.env.API_ENDPOINT_URI!,
			process.env.API_TOKEN!
		);
		webSocket.current.connect();
		webSocket.current.on('output', output => {
			getMessage(output);
			console.log('Text: ' + output.text + '   Data: ' + output.data);
		});
		webSocket.current.sendMessage('hello there');
		webSocket.current.sendMessage('hello there', { color: 'green' });
		webSocket.current.sendMessage('', { color: 'green' });
	}, []);
	console.log('history', history);
	return <div>Chat</div>;
};

export default Chat;
