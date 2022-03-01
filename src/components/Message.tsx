import React from 'react';

interface Props {
	text: string;
	data: any;
}

const Message: React.FC<Props> = ({ text, data }): JSX.Element => {
	console.log('text', text, 'data', data);
	return <div>Message</div>;
};

export default Message;
