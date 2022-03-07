import React from 'react'
import { Typography } from '@mui/material'

import { MessageBubble, MessageImage } from './Message.style'
import { Origin } from 'interfaces'

interface Props {
	origin: Origin
	text: string
	data: {
		imgSrc?: string
	}
}

export const Message: React.FC<Props> = ({
	origin,
	text,
	data,
}): JSX.Element => {
	const messageBubbleRef = React.useRef<HTMLDivElement | null>(null)

	const scrollToBottom = () => {
		// FIXME: doesn't work as smooth as expected
		messageBubbleRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		})
		setTimeout(
			// i know, i know, it's just a messy solution for the meantime, please just ignore it
			() =>
				messageBubbleRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				}),
			1000,
		)
	}

	React.useEffect(scrollToBottom, [])

	return (
		<MessageBubble ref={messageBubbleRef} origin={origin} elevation={2}>
			{data.imgSrc && <MessageImage src={data.imgSrc} alt='cat picture' />}
			<Typography p={1} variant='body1'>
				{text}
			</Typography>
		</MessageBubble>
	)
}
