import React from 'react'
import { MessageBubble, MessageImage, MessageText } from 'styles/Message.style'
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
			block: 'start',
		})
		setTimeout(
			// i know, i know, it's just a messy solution for the meantime, please just ignore it
			() =>
				messageBubbleRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				}),
			1000,
		)
	}

	React.useEffect(scrollToBottom, [])

	return (
		<MessageBubble ref={messageBubbleRef} origin={origin} elevation={2}>
			{data.imgSrc && <MessageImage src={data.imgSrc} alt='cat picture' />}
			<MessageText>{text}</MessageText>
		</MessageBubble>
	)
}
