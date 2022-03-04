import React from 'react';
import { Box, Paper } from '@mui/material';
import { styled, useTheme } from '@mui/material';
import { Origin } from 'redux/features/chatSlice';

interface StyleProps {
	origin: Origin;
}

const StyledPaper = styled(Paper, {
	shouldForwardProp: prop => prop !== 'origin',
})<StyleProps>(({ theme, origin }) => ({
	maxWidth: '90%',
	color:
		origin === Origin.User
			? theme.palette.primary.contrastText
			: theme.palette.secondary.contrastText,
	backgroundColor:
		origin === Origin.User
			? theme.palette.primary.main
			: theme.palette.secondary.main,
	alignSelf: origin === Origin.User ? 'end' : 'start',
}));

interface Props {
	origin: Origin;
	text: string;
	data: {
		imgSrc?: string;
	};
	id: string;
}

export const Message: React.FC<Props> = ({
	origin,
	text,
	data,
	id,
}): JSX.Element => {
	const { spacing } = useTheme();
	return (
		<StyledPaper origin={origin}>
			{data.imgSrc && (
				<img
					style={{ display: 'block', width: '100%' }}
					src={data.imgSrc}
					alt='cat picture'
				/>
			)}
			<Box sx={{ padding: spacing(1) }}>{text}</Box>
		</StyledPaper>
	);
};
