import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface ChatState {
	history: Message[];
}

interface Message {
	text: string;
	data: any;
}

const initialState: ChatState = {
	history: [],
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		postMessage: (state, action: PayloadAction<Message>) => {
			state.history.push(action.payload);
		},
		getMessage: (state, action: PayloadAction<Message>) => {
			state.history.push(action.payload);
		},
	},
});

export const { postMessage, getMessage } = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat.history;

export default chatSlice.reducer;
