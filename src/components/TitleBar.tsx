import React from 'react';
import { Typography, styled, Paper, Stack } from '@mui/material';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';

const StyledPaper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	heigh: 'auto',
	padding: theme.spacing(0, 1),
}));

export const TitleBar: React.FC = (): JSX.Element => {
	return (
		<StyledPaper variant='outlined' square>
			<Typography variant='subtitle1' component='h1' sx={{ flexGrow: 1 }}>
				Chatbot
			</Typography>
			<Stack direction='row' spacing={1}>
				<MinimizeIcon />
				<CloseIcon />
			</Stack>
		</StyledPaper>
	);
};
