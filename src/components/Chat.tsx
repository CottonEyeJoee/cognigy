import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';
import { Message } from 'components/Message';

import { useAppSelector } from 'redux/hooks';
import { selectChat } from 'redux/features/chatSlice';

interface Props {
	isBotActive: boolean;
	isLoading: boolean;
}

export const Chat: React.FC<Props> = ({
	isBotActive,
	isLoading,
}): JSX.Element => {
	const history = useAppSelector(selectChat);
	const bottomRef = React.useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		setTimeout(() => {
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); //FIXME: doesn't work as smooth as expected
		}, 1000);
	};

	React.useEffect(scrollToBottom, [history]);

	// it's too fast for the user to actually see it, but it's a good feeling to know it's there, just in case
	if (isLoading) return <CircularProgress sx={{ margin: 'auto' }} />;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				height: '100%',
			}}
			onClick={scrollToBottom}
			p={1}>
			<Stack spacing={1}>
				{history.map(props => (
					<Message key={props.id} {...props} />
				))}
			</Stack>
			<Box
				ref={bottomRef}
				sx={{
					visibility: isBotActive ? 'visible' : 'hidden',
				}}>
				Bot is typing...
			</Box>
		</Box>
	);
};
